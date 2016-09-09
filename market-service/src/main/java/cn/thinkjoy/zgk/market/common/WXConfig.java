package cn.thinkjoy.zgk.market.common;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.edomain.ErrorCode;
import cn.thinkjoy.zgk.market.pojo.AccessTokenView;
import cn.thinkjoy.zgk.market.pojo.BizData;
import cn.thinkjoy.zgk.market.pojo.UploadFileReturn;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jlusoft.microschool.core.utils.JsonMapper;
import org.springframework.core.io.FileSystemResource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by douzy on 16/5/12.
 */
public class WXConfig {

    /**
     * 微信APPID
     */
    protected final static String APPID="wx552f3800df25e964";
    /**
     * 微信AppSecret
     */
    protected final static String  APPSecret="8188e75b097aa62dc56272a0797d48ae";
    /**
     * 获取微信access_token
     */
    protected final static String GET_ACCESS_TOKEN_SERVER_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
    /**
     * 微信 多媒体下载
     */
    protected final static String DOWNLOAD_MEDIA_SERVER_URL = "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=%s&media_id=%s";

    /**
     *金山云URL
     */
    protected final static String CLOUD_SERVER_URL="http://cs-dev.thinkjoy.com.cn/rest/v1/uploadFile";


    static Map<String, String> map = new HashMap<String, String>();

    static{

        map.put("image/jpeg", ".jpg");

        map.put("image/png", ".png");

        map.put("audio/mp3", ".mp3");

        map.put("video/mpeg4", ".mp4");

    }

    private static String getFileEndWitsh(String contentType) {

        return map.get(contentType);

    }
    /**
     * 获取token
     * @return
     */
    public static AccessTokenView getAccessToken() {
        AccessTokenView accessTokenView = new AccessTokenView();

        String tokenServer = String.format(GET_ACCESS_TOKEN_SERVER_URL, APPID, APPSecret);

        String result = HttpTookit.doGet(tokenServer, null, "UTF-8", true);

        System.out.print(result);
        AccessTokenView accessToken = getUnSerializableAccessToken(result);

        return accessToken;
    }
    /**
     * 文件上传到微信服务器
     * @param fileType 文件类型
     * @param filePath 文件路径
     * @return JSONObject
     * @throws Exception
     */
    public static JSONObject send(String accessToken,String fileType, String filePath) throws Exception {
        String result = null;
        File file = new File(filePath);
        if (!file.exists() || !file.isFile()) {
            throw new IOException("文件不存在");
        }
        /**
         * 第一部分
         */
        URL urlObj = new URL("http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token="+ accessToken + "&type="+fileType+"");
        HttpURLConnection con = (HttpURLConnection) urlObj.openConnection();
        con.setRequestMethod("POST"); // 以Post方式提交表单，默认get方式
        con.setDoInput(true);
        con.setDoOutput(true);
        con.setUseCaches(false); // post方式不能使用缓存
        // 设置请求头信息
        con.setRequestProperty("Connection", "Keep-Alive");
        con.setRequestProperty("Charset", "UTF-8");
        // 设置边界
        String BOUNDARY = "----------" + System.currentTimeMillis();
        con.setRequestProperty("Content-Type", "multipart/form-data; boundary="+ BOUNDARY);
        // 请求正文信息
        // 第一部分：
        StringBuilder sb = new StringBuilder();
        sb.append("--"); // 必须多两道线
        sb.append(BOUNDARY);
        sb.append("\r\n");
        sb.append("Content-Disposition: form-data;name=\"file\";filename=\""+ file.getName() + "\"\r\n");
        sb.append("Content-Type:application/octet-stream\r\n\r\n");
        byte[] head = sb.toString().getBytes("utf-8");
        // 获得输出流
        OutputStream out = new DataOutputStream(con.getOutputStream());
        // 输出表头
        out.write(head);
        // 文件正文部分
        // 把文件已流文件的方式 推入到url中
        DataInputStream in = new DataInputStream(new FileInputStream(file));
        int bytes = 0;
        byte[] bufferOut = new byte[1024];
        while ((bytes = in.read(bufferOut)) != -1) {
            out.write(bufferOut, 0, bytes);
        }
        in.close();
        // 结尾部分
        byte[] foot = ("\r\n--" + BOUNDARY + "--\r\n").getBytes("utf-8");// 定义最后数据分隔线
        out.write(foot);
        out.flush();
        out.close();
        StringBuffer buffer = new StringBuffer();
        BufferedReader reader = null;
        try {
            // 定义BufferedReader输入流来读取URL的响应
            reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String line = null;
            while ((line = reader.readLine()) != null) {
                //System.out.println(line);
                buffer.append(line);
            }
            if(result==null){
                result = buffer.toString();
            }
        } catch (IOException e) {
            System.out.println("发送POST请求出现异常！" + e);
            e.printStackTrace();
            throw new IOException("数据读取异常");
        } finally {
            if(reader!=null){
                reader.close();
            }
        }
        JSONObject jsonObj =JSON.parseObject(result);
        return jsonObj;
    }
    /**
     *  微信 多媒体下载
     * @return
     */
    public static String downloadMedia(String accessToken, String mediaId, String savePath) {
        String filePath = null;
        String requestUrl = String.format(DOWNLOAD_MEDIA_SERVER_URL, accessToken, mediaId);
        // 拼接请求地址
        System.out.println(requestUrl);
        try {
            URL url = new URL(requestUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setDoInput(true);
            conn.setRequestMethod("GET");

            if (!savePath.endsWith("/")) {
                savePath += "/";
            }
            // 根据内容类型获取扩展名
            String fileExt = getFileEndWitsh(conn.getHeaderField("Content-Type"));
//            System.out.println("............"+fileExt);
            // 将mediaId作为文件名
            filePath = savePath + mediaId + fileExt;

            BufferedInputStream bis = new BufferedInputStream(conn.getInputStream());
            FileOutputStream fos = new FileOutputStream(new File(filePath));
            byte[] buf = new byte[8096];
            int size = 0;
            while ((size = bis.read(buf)) != -1)
                fos.write(buf, 0, size);
            fos.close();
            bis.close();

            conn.disconnect();
            String info = String.format("下载媒体文件成功，filePath=" + filePath);
            System.out.println(info);
        } catch (Exception e) {
            filePath = null;
            String error = String.format("下载媒体文件失败：%s", e);
            System.out.println(error);
        }
        return filePath;
    }

    /**
     * 反序列json
     * @return
     */
    private static AccessTokenView getUnSerializableAccessToken(String accessStr) {

        AccessTokenView accessTokenView = new AccessTokenView();
        try {
            JSONObject json = JSON.parseObject(accessStr);
            accessTokenView.setAccessToken(json.getString("access_token"));
            accessTokenView.setExpiresIn(json.getInteger("expires_in"));
            return accessTokenView;
        } catch (Exception ex) {
            return null;
        }
    }

    /**
     * 图片传送到远端    金山云
     * @return
     */
    public static BizData postRemote(String path) {
        File file = new File(path);
        MultiValueMap<String, Object> param = new LinkedMultiValueMap<String, Object>();
        FileSystemResource resource = new FileSystemResource(file);
        RestTemplate template = new RestTemplate();
        param.add("file", resource);
        param.add("productCode", "gk360");
        param.add("bizSystem", "gk360");
        param.add("spaceName", "gk360");
        param.add("userId", "gk360");
        param.add("dirId", "0");
        template.getMessageConverters().add(new com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter());
        String returnJson = template.postForObject(CLOUD_SERVER_URL, param, String.class);
        UploadFileReturn uploadFileReturn = JsonMapper.buildNormalMapper().fromJson(returnJson, UploadFileReturn.class);
        if (uploadFileReturn != null && "0000000".equals(uploadFileReturn.getRtnCode())) {
            file.delete();
            return uploadFileReturn.getBizData();
        }
        throw new BizException(ErrorCode.UPLOAD_FAIL.getCode(),ErrorCode.UPLOAD_FAIL.getMessage());

    }

    /**
     * test
     * @param arg
     * @throws Exception
     */
    public static void main(String[] arg) throws Exception
    {
        AccessTokenView accessTokenView = getAccessToken();

        JSONObject jsonObj = send(accessTokenView.getAccessToken(), "image", "/Users/yangguorong/Desktop/gitflow.png");

        if (jsonObj != null) {
            System.out.print("MediaId:" + jsonObj.get("media_id"));
            String path=Thread.currentThread().getContextClassLoader().getResource("").toString();
            path=path.substring(1, path.indexOf("classes")).replaceFirst("ile:","");
            String result = downloadMedia(accessTokenView.getAccessToken(),jsonObj.get("media_id").toString(), path);
            System.out.print("result:" + result);


//            UploadFileReturn uploadFileReturn=postRemote(result);
//            File file = new File(result);
//            MultiValueMap<String, Object> param = new LinkedMultiValueMap<String, Object>();
//            FileSystemResource resource = new FileSystemResource(file);
//            RestTemplate template = new RestTemplate();
//            param.add("file", resource);
//            param.add("productCode", "gk360");
//            param.add("bizSystem", "gk360");
//            param.add("spaceName", "gk360");
//            param.add("userId", "gk360");
//            param.add("dirId", "0");
//            template.getMessageConverters().add(new com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter());
//            String returnJson = template.postForObject(CLOUD_SERVER_URL, param, String.class);
//            UploadFileReturn uploadFileReturn = JsonMapper.buildNormalMapper().fromJson(returnJson, UploadFileReturn.class);
//            System.out.print(uploadFileReturn.getMsg());
//            System.out.print(uploadFileReturn.getRtnCode());
//            if(uploadFileReturn !=null && "0000000".equals(uploadFileReturn.getRtnCode())){
//                file.delete();
//            }



//
//
//            Map<String, Object> param = new HashMap<>();
//            File file= new File(result);
//            RestTemplate resetTemplate=new RestTemplate();
//            FileSystemResource resource = new FileSystemResource(file);
//            param.put("file", resource);
//            param.put("userId", "gk360");
//            param.put("dirID", "0");
//            param.put("productCode", "gk360");
//            param.put("bizSystem", "gk360");
//            param.put("spaceName", "gk360");
//            String resultUrl=resetTemplate.postForObject(CLOUD_SERVER_URL, param,String.class);
//            System.out.print("resultUrl:" + resultUrl);
        }
    }

}
