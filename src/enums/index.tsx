//  * PENDING_AUDIT=待审核
//  * AUDIT_PASS=审核通过
//  * AUDIT_REJECT=审核拒绝
//  * REFUNDING=退款中
//  * REFUND_SUCCESS=退款成功
//  * REFUND_FAILED=退款失败
export const SaleStatusEnum = {
  PENDING_AUDIT: { label: "待审核", value: "PENDING_AUDIT" },
  AUDIT_PASS: { label: "审核通过", value: "AUDIT_PASS" },
  AUDIT_REJECT: { label: "审核拒绝", value: "AUDIT_REJECT" },
  REFUNDING: { label: "退款中", value: "REFUNDING" },
  REFUND_SUCCESS: { label: "退款成功", value: "REFUND_SUCCESS" },
  REFUND_FAILED: { label: "退款失败", value: "REFUND_FAILED" },
} as const;

export type SaleStatusEnum =
  (typeof SaleStatusEnum)[keyof typeof SaleStatusEnum]["value"];
