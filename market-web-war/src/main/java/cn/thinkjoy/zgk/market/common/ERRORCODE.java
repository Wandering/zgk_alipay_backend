package cn.thinkjoy.zgk.market.common;

/**
 * Created by xgfan on 14-12-4.
 */
public enum ERRORCODE {

	PARAM_ERROR("0100001", "参数错误"),
	FAIL("0100002", "失败"),
	PHONE_FORMAT_ERROR("0100003", "电话号码格式错误"),
	ACCOUNT_NO_EXIST("0100004", "账户不存在"),
	TEACHER_NO_EXIST("0100005", "教师不存在"),
	PARENT_NO_EXIST("0100006", "家长不存在"),
	CHILD_NO_EXIST("0100007", "孩子不存在"),
	STUDENT_NO_EXIST("0100008", "学生不存在"),
	CLASS_NO_EXIST("0100009", "班级不存在"),
	GROUP_NO_EXIST("0100010", "群组不存在"),
	SCHOOL_NO_EXIST("0100011", "学校不存在"),
	USER_NO_EXIST("0100012", "用户不存在"),
	USER_EXPIRED("0100013", "用户信息已过期"),
	USER_UN_LOGIN("0100014", "用户未登录"),

	AUTHENTICATION_FAIL("0100020", "鉴权失败"),
	ACCOUNT_BIND_ERROR("0100021", "账户绑定失败"),
	ACCOUNT_REGIST_FAIL("0100021", "账户注册失败"),
	/**
	 * 登录
	 */

	LOGIN_PHONE_FORMAT_ERROR("0200001", "电话号码格式错误"),
	LOGIN_ACCOUNT_NO_EXIST("0200002", "账户不存在"),
	LOGIN_PASSWORD_ERROR("0200003", "密码错误"),
	LOGIN_ERROR("0200004", "登录失败"),
	PHONENUM_HAS_EXIST("0200005", "手机号码已存在"),
	PHONENUM_NOT_EXIST("0200006", "手机号不存在"),

	/**
	 * 验证码输入错误
	 */

	UPDATE_PASSWORD_ERROR("0300001", "更新密码失败"),

	/**
	 * 验证码
	 */

	CHECK_SMSCODE_ERROR("0400001", "验证码输入错误"),
	CHECK_SMSCODE_EXPIRE("0400002", "验证码失效"),
	CHECK_SMSCODE_NOT_EXIST("0400003", "验证码过期或不存在，请重新获取!"),

	/**
	 * 发送验证码失败
	 */

	SEND_SMSCODE_ERROR("0500001", "发送验证码失败"),
	SEND_SMSCODE_MORE("0500002", "获取验证码太频烦,请稍后再试"),
	ORDER_VIP_REPEAT("0600001", "重复订购"),
	PARAM_ISNULL("0700001","参数不能为空"),
	NO_RECORD("0800001","无记录"),
	VIP_EXIST("0900001","该用户已经是VIP了，请勿重复申请"),
	NO_VIP("0100001","您还不是VIP用户,请先成为VIP用户后再使用该服务!"),
	EXPERT_VIP_UN_EXIST("0100002","该用户的VIP不是具有专家的VIP"),
	EXPERT_VIP_ZERO("0100003","您购买的产品服务已使用完，请另行购买后再预约课程！"),
	NO_EXPERT_SERVICE("0100004","该用户不具备该专家服务的权限"),
	YES_EXPERT_SERVICE("0100005","该用户已经预约该专家"),
	EXPERT_SERVICE_TIME_N("0100006","专家服务时间不可用"),
	VIP_CARD_NOT_INVALID("0900002","信息输入错误，请仔细核对信息!"),
	VIP_CARD_USED("0900003", "该卡已激活，请输入新的卡号!"),
	VIP_UPGRADE_FAIL("0900004", "升级失败，请联系客服查询详细信息!"),
	RESTFUL_INTERFACE_ISNULL("1000001","第三方数据接口返回数据为空"),
	RESTFUL_INTERFACE_ISERROR("1000002","第三方数据接口异常"),
	CREATE_VERIFY_CODE_ERROR("1000003","生成验证码发生错误!"),
	NO_LOGIN("1000004","请先登录后再进行操作"),
	VERIFY_CODE_ERROR("0100005", "验证码错误!"),
	NOT_IS_VIP_ERROR("0100006", "升级成VIP用户才可使用该功能，快点升级VIP用户去吧！"),
	CARD_HAS_ACTIVATE("0100007", "该卡已被激活!"),
	ORDER_PAY_FAIL("0100008", "支付失败!"),

	PARAM_NOTEXIST("0600001", "查询参数不存在"),
	IDISNOTNULL("0600002", "id不能为空"),
	RESOURCEOCCUPY("0600003", "资源被占用"),
	RESOURCEISNULL("0600005", "资源不存在"),
	DELETEEXCEPTION("0600006", "删除异常"),
	ADDEXCEPTION("0600004", "添加异常"),
	HASPREDICT("0600007", "您今天已经预测过了，请明天再来！"),
	ISLOGIN("0600008", "当前用户未登录！"),
	SCORE_ERROR("0600009", "请输入正确的分数!"),
	SCHOOL_NAME_ERROR("0600010", "请输入院校名称!"),

	ROWS_TOO_LONG("1200001","查询条数过多"),

	UPLOAD_ERROR_0("1100001", "非法上传!"),

	UPLOAD_ERROR_405("1100002", "请上传文件!"),

	UPLOAD_ERROR_400("1100003", "文件超过大小限制!"),

	UPLOAD_ERROR_401("1100004", "零字节的文件!"),

	UPLOAD_ERROR_402("1100005", "无效的文件类型!"),

	UPLOAD_ERROR_500("1100006", "服务端发生错误!"),

	IMAGE_CAPTCHA_NOT_EXIST_ERROR("0600011", "图形验证码已失效,或者不存在!"),

	IMAGE_CAPTCHA_INVALID_ERROR("0600012", "图形验证码错误!"),

	EVALUATION_IS_NULL("0600014", "测评结果不能为空!"),

	COLLECTION_EXIST("0600015", "该组合已经被收藏!"),

	SELECT_SUBJECT_IDENTICAL("0600013", "只有不同的选课方案才能做对比哦!"),

	DELETE_CHANNEL_FAIL("0600014", "没有权限删除频道"),

	DELETE_CHANNEL_ERROR("0600015", "删除频道出错,请稍后再试"),

	CREATE_CHANNEL_FAIL("0600016", "创建频道失败,请稍后再试"),

	GET_CHANNEL_STATE_FAIL("0600017", "获取频道状态失败,请稍后再试");

	/** The code. */
	private final String code;

	/** The message. */
	private final String message;

	/**
	 * Instantiates a new error type.
	 *
	 * @param code
	 *            the code
	 * @param message
	 *            the message
	 */
	private ERRORCODE(String code, String message) {
		this.code = code;
		this.message = message;
	}

	/**
	 * Gets the code.
	 *
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * Gets the message.
	 *
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

}