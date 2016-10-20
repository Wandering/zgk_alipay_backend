package cn.thinkjoy.zgk.market.alipay;

/**
 * Created by liusven on 16/7/28.
 */
public class AlipayConfig
{
    // 合作身份者ID
    public static String partner = "2088221714051384";
    // 商户的私钥
    public static String key = "3aozokielh93hoaxnw1nnma3ezwozpuc";

    // 调试用，创建TXT日志文件夹路径
    public static String log_path = "/Users/liusven/Desktop";

    // 字符编码格式
    public static String input_charset = "utf-8";

    // 签名方式 不需修改
    public static String sign_type = "MD5";

    public static String return_url = "http://localhost:8080/login";

    public static String service = "alipay.auth.authorize";

    public static String target_service = "user.auth.quick.login";

    public static String APP_ID = "2016072801677705";

    public static String APP_DEV_ID = "2015122300879608";

    public static String APP_TEST_ID = "2016072801677796";

    public static String APP_PRIVATE_KEY =  "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALDgDVND5HC4c6Et" +
                                            "VaARFO+zfC+rtWNkxY8NH64eyQHoshlYRSpg2u0bSugaxVG9CxQBcqakyW8yWEil" +
                                            "IaTP+jeh8PixX/nAkB9wQr5K+Q8U2z+wFHAJ8zwMx2LWX6klZ+jJ78y2XG6iARMc" +
                                            "0iiUWLVoBrVERzKojEhI+FfX4fJnAgMBAAECgYEAqQ8ujWS6R6d2FhuP2TQaj9Y9" +
                                            "oA7+jCc40beYjUQtmp6BBMqjKZN0DeflXB6idbM8kH2lyXR+eMNlMOJtWuvTW5yj" +
                                            "8DP2ORIzmwk1EXu6HSnBXr4AR7u8Dxs9fetsUbJx8OEKV6J8d8shfUHOCU9l7q2J" +
                                            "ZHwbTeUlaNP/UJu28dkCQQDXksPawQ/zuwXmoUYTaSwn/92ETN7howfD1d0yh01O" +
                                            "Yx661BnHcQIA1LjnAica3CTjD9rfZPtO8g6uM0czCwsjAkEA0gt4XVkP2Kgj3qjs" +
                                            "1panks12PVtRRdp4BagADTvrnzo7FUUpIcAl9WJgxsYEZyssAdf+ZYWlg/gGYAeo" +
                                            "GISB7QJADX1Uniq4mdLZMq5i2TIankInlXDN/aabBMksN046Ky6OrLg7CLzsmCq3" +
                                            "i1UaJ1chQ8gpNRN3mmARRRtWWD5XqwJAUaTHunEd6bchijDbLmYM6NEYPq06IA7V" +
                                            "TE2LB5nc8l1uDcx+OnI3zvPYbisWFwv+5RCR/+A8/9jukXEoc6892QJBAKWjNHrV" +
                                            "EMW0IIUsG27XlKPQkBEvAbq5TmJDc044m0bT9LHjzRDpcUPl0x84FljfnPuwxevm" +
                                            "PVmvxzfy3nmmAdE=";

    public static String APP_DEV_PRIVATE_KEY = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKK0PXoLKnBkgtOl0kvyc9X2tUUdh/lRZr9RE1frjr2ZtAulZ+Moz9VJZFew1UZIzeK0478obY/DjHmD3GMfqJoTguVqJ2MEg+mJ8hJKWelvKLgfFBNliAw+/9O6Jah9Q3mRzCD8pABDEHY7BM54W7aLcuGpIIOa/qShO8dbXn+FAgMBAAECgYA8+nQ380taiDEIBZPFZv7G6AmT97doV3u8pDQttVjv8lUqMDm5RyhtdW4n91xXVR3ko4rfr9UwFkflmufUNp9HU9bHIVQS+HWLsPv9GypdTSNNp+nDn4JExUtAakJxZmGhCu/WjHIUzCoBCn6viernVC2L37NL1N4zrR73lSCk2QJBAPb/UOmtSx+PnA/mimqnFMMP3SX6cQmnynz9+63JlLjXD8rowRD2Z03U41Qfy+RED3yANZXCrE1V6vghYVmASYsCQQCoomZpeNxAKuUJZp+VaWi4WQeMW1KCK3aljaKLMZ57yb5Bsu+P3odyBk1AvYIPvdajAJiiikRdIDmi58dqfN0vAkEAjFX8LwjbCg+aaB5gvsA3t6ynxhBJcWb4UZQtD0zdRzhKLMuaBn05rKssjnuSaRuSgPaHe5OkOjx6yIiOuz98iQJAXIDpSMYhm5lsFiITPDScWzOLLnUR55HL/biaB1zqoODj2so7G2JoTiYiznamF9h9GuFC2TablbINq80U2NcxxQJBAMhw06Ha/U7qTjtAmr2qAuWSWvHU4ANu2h0RxYlKTpmWgO0f47jCOQhdC3T/RK7f38c7q8uPyi35eZ7S1e/PznY=";

    public static String APP_TEST_PRIVATE_KEY = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAM7kKSUraOasaSbT" +
                                                "OZ4+O558PRASGF1lGDgpxcZDefl/XL5XWAFjHK/CSa4vPz7nFLFilGI2AYXT7CcE" +
                                                "HDsnJh1l1t7TBoL3bIldzUSQ1BmT2C8eHJT5TLvXQPmYwSV9BixCA+sVAyletlPq" +
                                                "XXEJdnBWCP5K7FgtNrRuAaja7XmfAgMBAAECgYB+x5HvFQrTUBOflxBXyAsAs2E3" +
                                                "197WXHza7b4kIHU+Tq2mdh+XugR6L7S26Hz5LuGfUalcBXwpZhPwVLR4CyVvA9hI" +
                                                "p6sthWEKWB81jYUko/kLkh2czDsS6ERL357MV0cXu/ZN99KFkfwehLRUEhVZ+ub9" +
                                                "CtgRBNkZh/4SzKgoAQJBAPN4TSFJ47oVB/cPBWiZP+2QsL3XosQ5AMmmoTvPKy2D" +
                                                "ufDQceHF5kFxv3VUIsMvz0rrAcMeX4S6dIjYXmyc0z8CQQDZifAjozFkAYcoDyQm" +
                                                "bYbGHZPtXiUj/oWWiEQkyBW1LHk7sXjn90/vxMfbHLr1B7mfNBFtWyeYGiTCISoi" +
                                                "DqGhAkBChF6GNrq5zx8i936hyiS2Ee7Hnw9ADtbRQO4R+hKw16lISpqidT/oJ1yI" +
                                                "gJkSvJAkxrnvhe/QwmQuMvbxM5NfAkEAsdzmSz0TFQFq0IYQuJq0pydn25wuIc/o" +
                                                "ybuAe9JcbVV/ih8BDChZY2ExRyWmdtFqI5Ee7pqpNOOrSk5zdIUiAQJAG0lkJaGx" +
                                                "jv+EWcvKMFtHkEGOLtfWGay2oJ9SKk4Kf8xofSwC6UU830zVIlG+NBj+jqvXysMy" +
                                                "XuNkQgCdPKgZLw==";

    public static String APP_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw4A1TQ+RwuHOhLVWgERTvs3wvq7VjZMWPDR+uHskB6LIZWEUqYNrtG0roGsVRvQsUAXKmpMlvMlhIpSGkz/o3ofD4sV/5wJAfcEK+SvkPFNs/sBRwCfM8DMdi1l+pJWfoye/MtlxuogETHNIolFi1aAa1REcyqIxISPhX1+HyZwIDAQAB";

    public static String APP_DEV_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCitD16CypwZILTpdJL8nPV9rVFHYf5UWa/URNX6469mbQLpWfjKM/VSWRXsNVGSM3itOO/KG2Pw4x5g9xjH6iaE4LlaidjBIPpifISSlnpbyi4HxQTZYgMPv/TuiWofUN5kcwg/KQAQxB2OwTOeFu2i3LhqSCDmv6koTvHW15/hQIDAQAB";

    public static String APP_TEST_PUBLIC_KEY ="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDO5CklK2jmrGkm0zmePjuefD0QEhhdZRg4KcXGQ3n5f1y+V1gBYxyvwkmuLz8+5xSxYpRiNgGF0+wnBBw7JyYdZdbe0waC92yJXc1EkNQZk9gvHhyU+Uy710D5mMElfQYsQgPrFQMpXrZT6l1xCXZwVgj+SuxYLTa0bgGo2u15nwIDAQAB";

    public static String ALIPAY_PUBLIC_KEY      = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDI6d306Q8fIfCOaTXyiUeJHkrIvYISRcc73s3vF1ZT7XN8RNPwJxo8pWaJMmvyTn9N4HQ632qJBVHf8sxHi/fEsraprwCtzvzQETrNRwVxLO5jVmRGi60j8Ue1efIlzPXV9je9mkjzOmdssymZkh2QhUrCmZYI/FCEa3/cNMW0QIDAQAB";

    public static String ALIPAY_DEV_PUBLIC_KEY  = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIgHnOn7LLILlKETd6BFRJ0GqgS2Y3mn1wMQmyh9zEyWlz5p1zrahRahbXAfCfSqshSNfqOmAQzSHRVjCqjsAw1jyqrXaPdKBmr90DIpIxmIyKXv4GGAkPyJ/6FTFY99uhpiq0qadD/uSzQsefWo0aTvP/65zi3eof7TcZ32oWpwIDAQAB";

    public static String ALIPAY_TEST_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDI6d306Q8fIfCOaTXyiUeJHkrIvYISRcc73s3vF1ZT7XN8RNPwJxo8pWaJMmvyTn9N4HQ632qJBVHf8sxHi/fEsraprwCtzvzQETrNRwVxLO5jVmRGi60j8Ue1efIlzPXV9je9mkjzOmdssymZkh2QhUrCmZYI/FCEa3/cNMW0QIDAQAB";
}
