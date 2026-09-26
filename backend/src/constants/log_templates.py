LOG_TEMPLATES = {
  "Building": [
    "Building.create",
    "Building.update",
    "Building.status",
    "Building.export"
  ],
  "FireDevice": [
    "FireDevice.create",
    "FireDevice.update",
    "FireDevice.status",
    "FireDevice.export"
  ],
  "InspectionTask": [
    "InspectionTask.create",
    "InspectionTask.update",
    "InspectionTask.status",
    "InspectionTask.export"
  ],
  "InspectionResult": [
    "InspectionResult.create",
    "InspectionResult.update",
    "InspectionResult.status",
    "InspectionResult.export"
  ],
  "HazardTicket": [
    "HazardTicket.create",
    "HazardTicket.update",
    "HazardTicket.status",
    "HazardTicket.export",
    "HazardTicket.submitRectify",
    "HazardTicket.reviewApprove",
    "HazardTicket.reviewReject"
  ]
}

# 整改流转动作 -> 日志模板，service 写流转记录时引用
HAZARD_FLOW_LOG = {
  "CREATE": "HazardTicket.create",
  "SUBMIT_RECTIFY": "HazardTicket.submitRectify",
  "REVIEW_APPROVE": "HazardTicket.reviewApprove",
  "REVIEW_REJECT": "HazardTicket.reviewReject"
}
