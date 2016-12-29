package cn.thinkjoy.zgk.market.common;

/**
 * Created by liusven on 2016/12/29.
 */
public class ReportEnum
{
    /**
     * 文理
     */
    public enum categories {
        WEN {
            @Override
            public int getValue() {
                return 1;
            }
        },
        LI {
            @Override
            public int getValue() {
                return 2;
            }
        };

        public abstract int getValue();
    }

    /**
     * 批次
     */
    public enum batch {
        ONE {
            @Override
            public int getValue() {
                return 1;
            }
        },
        TWO {
            @Override
            public int getValue() {
                return 2;
            }
        }, THREE {
            @Override
            public int getValue() {
                return 3;
            }
        };

        public abstract int getValue();
    }

    /**
     * 位次法搜索维度  - 0 院校排名   1 录取率排名
     */
    public enum RankDim {
        RANK {
            @Override
            public byte getValue() {
                return 0;
            }
        },
        ENROLLING {
            @Override
            public byte getValue() {
                return 1;
            }
        };

        public abstract byte getValue();
    }
    /**
     * 算法走向  - 1:位次法 2:分数转换位次  3：线差
     */
    public enum LogicTrend {

        PRECEDENCE(1),
        SCORECONVER(2),
        LINEDIFF(3);

        private final Integer logic;

        private LogicTrend(Integer logic) {
            this.logic = logic;
        }

        public static LogicTrend getLogic(Integer num) {
            switch (num) {
                case 1:
                    return LogicTrend.PRECEDENCE;
                case 2:
                    return LogicTrend.SCORECONVER;
                case 3:
                    return LogicTrend.LINEDIFF;
                default:
                    return LogicTrend.PRECEDENCE;
            }
        }
    }
}
