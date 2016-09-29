package cn.thinkjoy.zgk.market.util;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;

public class DESUtil {
    private static final String KEY_ALGORITHM = "DES";
    private static final String CIPHER_ALGORITHM = "DES/ECB/NoPadding";
    public static final String key = "zgk@2016fighting";
    /**
     *   
     * @throws InvalidKeyException
     * @throws NoSuchAlgorithmException   
     * @throws InvalidKeySpecException   
     * @throws Exception 
     */
    private static SecretKey keyGenerator(String keyStr) throws Exception {
        byte input[] = HexString2Bytes(keyStr);
        DESKeySpec desKey = new DESKeySpec(input);
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey securekey = keyFactory.generateSecret(desKey);
        return securekey;
    }

    private static int parse(char c) {
        if (c >= 'a') return (c - 'a' + 10) & 0x0f;
        if (c >= 'A') return (c - 'A' + 10) & 0x0f;
        return (c - '0') & 0x0f;
    }

    private static byte[] HexString2Bytes(String hexstr) {
        byte[] b = new byte[hexstr.length() / 2];
        int j = 0;
        for (int i = 0; i < b.length; i++) {
            char c0 = hexstr.charAt(j++);
            char c1 = hexstr.charAt(j++);
            b[i] = (byte) ((parse(c0) << 4) | parse(c1));
        }
        return b;
    }

    /** 
     */
    public static String encrypt(String data, String key) throws Exception {
        Key deskey = keyGenerator(key);
        Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
        SecureRandom random = new SecureRandom();
        cipher.init(Cipher.ENCRYPT_MODE, deskey, random);
        byte[] results = cipher.doFinal(data.getBytes());
        return Base64.encodeBase64String(results);
    }

    /** 
     */
    public static String decrypt(String data, String key) throws Exception {
        Key deskey = keyGenerator(key);
        Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, deskey);
        return new String(cipher.doFinal(Base64.decodeBase64(data)));
    }

    public static String getEightByteMultypleStr(String id, String userName)
    {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append(id).append("@@").append(userName);
    	while (buffer.length() % 8 != 0)
        {
            buffer.append(" ");
        }
    	return buffer.toString();
    }
    
    public static String[] getUserInfo(String str)
    {
    	String[] strs= null;
    	if(null != str && str.indexOf("@@")>0)
    	{
    		strs = str.split("@@");
    	}
    	return strs;
    }
}