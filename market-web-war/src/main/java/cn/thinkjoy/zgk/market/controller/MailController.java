package cn.thinkjoy.zgk.market.controller;

import cn.thinkjoy.common.exception.BizException;
import com.alibaba.dubbo.common.json.JSON;
import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.ParseException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by liusven on 2017/1/11.
 */
public class MailController extends TextWebSocketHandler
{
    public static String get(String url) {
        String result = "";
        HttpClient client = new HttpClient();
        GetMethod method = new GetMethod(url);
        method.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
            new DefaultHttpMethodRetryHandler(3, false));
        try {
            int statusCode = client.executeMethod(method);
            if (statusCode != HttpStatus.SC_OK) {
                System.err.println("Method failed: " + method.getStatusLine());
            }
            byte[] responseBody = method.getResponseBody();
            result = new String(responseBody);
        } catch (HttpException e) {
            System.err.println("Fatal protocol violation: " + e.getMessage());
            e.printStackTrace();
        } catch (IOException e) {
            System.err.println("Fatal transport error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            method.releaseConnection();
        }
        return result;
    }

//    public static void main(String[] args)
//    {
//        String url = "http://lxy.btbu.edu.cn/szdw/yjsds/index.htm";
//        String s = get(url);
//        Document queryDocument = Jsoup.parse(s);
//        Elements as = queryDocument.select("body a").select(".jslist");
//        String prefix = url.substring(0, url.lastIndexOf("/")+1);
//        List<Map<String, String>> list = new LinkedList<>();
//        for (int i = 0; i < as.size(); i++)
//        {
//            Element element = as.get(i);
//            String href = element.attr("href");
//            if(href.contains("../"))
//            {
//                continue;
//            }else
//            {
//                Map<String, String> map = new HashMap<>();
//                map.put("url", prefix + href);
//                map.put("name", element.html());
//                list.add(map);
//            }
//        }
//        String regex = "\\w+(\\.\\w)*@\\w+(\\.\\w{2,3}){1,3}";
//        Pattern emailer = Pattern.compile(regex);
//        StringBuffer emails = new StringBuffer();
//        for (Map<String, String> map :list)
//        {
//            String url1 = map.get("url");
//            String content = get(url1);
//            Matcher matchr = emailer.matcher(content);
//            Set<String> emailSet = new HashSet<>();
//            while (matchr.find()) {
//                String email = matchr.group();
//                emailSet.add(email);
//            }
//            for (String email : emailSet)
//            {
//                emails.append(", "+ email);
//            }
//            if(emails.length()>0)
//            {
//                emails.delete(0,1);
//            }
//            System.out.println(emails.toString());
//            break;
//        }
//    }

    @RequestMapping("/")
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);
        String url = parseMsg(message);
        if(StringUtils.isEmpty(url))
        {
            sendMassage(session, "url不能为空！！");
            return;
        }
        if(!url.startsWith("http://"))
        {
            url = "http://" + url;
        }
        sendMassage(session, "开始解析Url:"+url);
        List<Map<String, String>> list = new LinkedList<>();
        try
        {
            String s = get(url);
            Document queryDocument = Jsoup.parse(s);
            Elements as = queryDocument.select("body a").select(".jslist");
            String prefix = url.substring(0, url.lastIndexOf("/")+1);
            for (int i = 0; i < as.size(); i++)
            {
                Element element = as.get(i);
                String href = element.attr("href");
                if(href.contains("../"))
                {
                    continue;
                }else
                {
                    Map<String, String> map = new HashMap<>();
                    map.put("url", prefix + href);
                    map.put("name", element.html());
                    list.add(map);
                }
            }
        }
        catch (Exception e)
        {
            sendMassage(session, "url错误！！");
            return;
        }
        String regex = "\\w+(\\.\\w)*@\\w+(\\.\\w{2,20}){1,20}";
        Pattern emailer = Pattern.compile(regex);
        if(list.size() > 0)
        {
            sendMassage(session, "找到如下email信息：");
        }
        for (Map<String, String> map :list)
        {
            String url1 = map.get("url");
            String content = get(url1);
            Matcher matchr = emailer.matcher(content);
            Set<String> emailSet = new HashSet<>();
            while (matchr.find()) {
                String email = matchr.group();
                emailSet.add(email);
            }
            StringBuffer emails = new StringBuffer();
            for (String email : emailSet)
            {
                if("songsx@btbu.edu.cn".equals(email))
                    continue;
                emails.append(", "+ email);
            }
            if(emails.length()>0)
            {
                emails.delete(0,1);
            }else {
                emails.append("无");
            }
            sendMassage(session, "来源url："+url1+ ", email地址：" + emails.toString());
        }
        sendMassage(session, "解析完毕");
    }

    private void sendMassage(WebSocketSession session, String msg)
        throws IOException
    {
        TextMessage returnMessage = new TextMessage(msg);
        session.sendMessage(returnMessage);
    }

    private String parseMsg(TextMessage message)
        throws com.alibaba.dubbo.common.json.ParseException
    {
        Map<String, Object> map = JSON.parse(message.getPayload(), Map.class);
        return map.get("message") + "";
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
// 消息传输出错时调用
        System.out.println("handleTransportError");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session,
        CloseStatus closeStatus) throws Exception {
// 一个客户端连接断开时关闭
        System.out.println("afterConnectionClosed");
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
