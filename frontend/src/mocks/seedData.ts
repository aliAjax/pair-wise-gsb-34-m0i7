export const mockData = {
  "building": [
    {
      "id": 1,
      "name": "name 1",
      "campus": "campus 1",
      "floor_count": "floor count 1",
      "fire_grade": "fire grade 1",
      "manager_id": 1,
      "address_code": "address code 1"
    },
    {
      "id": 2,
      "name": "name 2",
      "campus": "campus 2",
      "floor_count": "floor count 2",
      "fire_grade": "fire grade 2",
      "manager_id": 2,
      "address_code": "address code 2"
    },
    {
      "id": 3,
      "name": "name 3",
      "campus": "campus 3",
      "floor_count": "floor count 3",
      "fire_grade": "fire grade 3",
      "manager_id": 3,
      "address_code": "address code 3"
    }
  ],
  "fireDevice": [
    {
      "id": 1,
      "building_id": 1,
      "device_code": "device code 1",
      "device_type": "HYDRANT",
      "floor": "floor 1",
      "location_desc": "location desc 1",
      "install_date": "2026-06-11T09:00:00Z",
      "status": "IN_PROGRESS",
      "next_maintenance_at": "2026-06-11T09:00:00Z"
    },
    {
      "id": 2,
      "building_id": 2,
      "device_code": "device code 2",
      "device_type": "SMOKE_DETECTOR",
      "floor": "floor 2",
      "location_desc": "location desc 2",
      "install_date": "2026-06-12T09:00:00Z",
      "status": "SUBMITTED",
      "next_maintenance_at": "2026-06-12T09:00:00Z"
    },
    {
      "id": 3,
      "building_id": 3,
      "device_code": "device code 3",
      "device_type": "SPRINKLER",
      "floor": "floor 3",
      "location_desc": "location desc 3",
      "install_date": "2026-06-13T09:00:00Z",
      "status": "PLANNED",
      "next_maintenance_at": "2026-06-13T09:00:00Z"
    }
  ],
  "inspectionTask": [
    {
      "id": 1,
      "building_id": 1,
      "inspector_id": 1,
      "plan_date": "2026-06-11T09:00:00Z",
      "task_type": "HYDRANT",
      "status": "IN_PROGRESS",
      "checklist_version": "checklist version 1",
      "finished_at": "2026-06-11T09:00:00Z"
    },
    {
      "id": 2,
      "building_id": 2,
      "inspector_id": 2,
      "plan_date": "2026-06-12T09:00:00Z",
      "task_type": "SMOKE_DETECTOR",
      "status": "SUBMITTED",
      "checklist_version": "checklist version 2",
      "finished_at": "2026-06-12T09:00:00Z"
    },
    {
      "id": 3,
      "building_id": 3,
      "inspector_id": 3,
      "plan_date": "2026-06-13T09:00:00Z",
      "task_type": "SPRINKLER",
      "status": "PLANNED",
      "checklist_version": "checklist version 3",
      "finished_at": "2026-06-13T09:00:00Z"
    }
  ],
  "inspectionResult": [
    {
      "id": 1,
      "task_id": 1,
      "device_id": 1,
      "item_code": "HYDRANT-01",
      "result_status": "SUBMITTED",
      "measured_value": "压力表指针归零",
      "photo_url": "/mock/photo_url-1.png",
      "note": "室内消火栓出水压力不足"
    },
    {
      "id": 2,
      "task_id": 2,
      "device_id": 2,
      "item_code": "SMOKE-01",
      "result_status": "SUBMITTED",
      "measured_value": "报警无反馈",
      "photo_url": "/mock/photo_url-2.png",
      "note": "烟感探测器联动测试无响应"
    },
    {
      "id": 3,
      "task_id": 3,
      "device_id": 3,
      "item_code": "SPRINKLER-01",
      "result_status": "SUBMITTED",
      "measured_value": "玻璃球破裂",
      "photo_url": "/mock/photo_url-3.png",
      "note": "喷淋喷头损坏需更换"
    },
    {
      "id": 4,
      "task_id": 1,
      "device_id": 1,
      "item_code": "HYDRANT-02",
      "result_status": "SUBMITTED",
      "measured_value": "接口锈蚀",
      "photo_url": "/mock/photo_url-4.png",
      "note": "水带接口锈蚀影响连接"
    },
    {
      "id": 5,
      "task_id": 2,
      "device_id": 2,
      "item_code": "SMOKE-02",
      "result_status": "SUBMITTED",
      "measured_value": "无报警反馈",
      "photo_url": "/mock/photo_url-5.png",
      "note": "烟感探测器无响应"
    },
    {
      "id": 6,
      "task_id": 3,
      "device_id": 3,
      "item_code": "SPRINKLER-03",
      "result_status": "SUBMITTED",
      "measured_value": "管网压力 0.05MPa",
      "photo_url": "/mock/photo_url-6.png",
      "note": "喷淋末端试水压力不足"
    }
  ],
  "hazardTicket": [
    {
      "id": 1,
      "result_id": 1,
      "severity": "CRITICAL",
      "owner_id": 11,
      "deadline": "2026-09-20T18:00:00Z",
      "rectify_status": "IN_PROGRESS",
      "rectify_note": "",
      "closed_at": ""
    },
    {
      "id": 2,
      "result_id": 2,
      "severity": "HIGH",
      "owner_id": 12,
      "deadline": "2026-09-25T18:00:00Z",
      "rectify_status": "PENDING_REVIEW",
      "rectify_note": "已更换故障探测器并联动复测",
      "closed_at": ""
    },
    {
      "id": 3,
      "result_id": 3,
      "severity": "MEDIUM",
      "owner_id": 11,
      "deadline": "2026-10-05T18:00:00Z",
      "rectify_status": "IN_PROGRESS",
      "rectify_note": "",
      "closed_at": ""
    },
    {
      "id": 4,
      "result_id": 4,
      "severity": "LOW",
      "owner_id": 13,
      "deadline": "2026-10-10T18:00:00Z",
      "rectify_status": "PENDING_REVIEW",
      "rectify_note": "已更换锈蚀接口并做防锈处理",
      "closed_at": ""
    },
    {
      "id": 5,
      "result_id": 5,
      "severity": "HIGH",
      "owner_id": 12,
      "deadline": "2026-09-18T18:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "已更换故障烟感探测器",
      "closed_at": "2026-09-19T10:30:00Z"
    },
    {
      "id": 6,
      "result_id": 6,
      "severity": "CRITICAL",
      "owner_id": 11,
      "deadline": "2026-09-30T18:00:00Z",
      "rectify_status": "PENDING_REVIEW",
      "rectify_note": "已修复管网漏点并加压测试",
      "closed_at": ""
    }
  ],
  "hazardTicketFlow": [
    {
      "id": 1,
      "ticket_id": 1,
      "action": "SUBMIT",
      "from_status": "IN_PROGRESS",
      "to_status": "PENDING_REVIEW",
      "note": "已临时关闭阀门，待更换损坏部件",
      "operator_role": "vendor",
      "created_at": "2026-09-19T09:20:00Z"
    },
    {
      "id": 2,
      "ticket_id": 1,
      "action": "REJECT",
      "from_status": "PENDING_REVIEW",
      "to_status": "IN_PROGRESS",
      "note": "仅关闭阀门未更换损坏部件，需重新整改",
      "operator_role": "auditor",
      "created_at": "2026-09-19T15:40:00Z"
    },
    {
      "id": 3,
      "ticket_id": 2,
      "action": "SUBMIT",
      "from_status": "IN_PROGRESS",
      "to_status": "PENDING_REVIEW",
      "note": "已更换故障探测器并联动复测",
      "operator_role": "vendor",
      "created_at": "2026-09-24T11:05:00Z"
    },
    {
      "id": 4,
      "ticket_id": 4,
      "action": "SUBMIT",
      "from_status": "IN_PROGRESS",
      "to_status": "PENDING_REVIEW",
      "note": "已更换锈蚀接口并做防锈处理",
      "operator_role": "vendor",
      "created_at": "2026-09-25T16:45:00Z"
    },
    {
      "id": 5,
      "ticket_id": 5,
      "action": "SUBMIT",
      "from_status": "IN_PROGRESS",
      "to_status": "PENDING_REVIEW",
      "note": "已更换故障烟感探测器",
      "operator_role": "vendor",
      "created_at": "2026-09-18T14:10:00Z"
    },
    {
      "id": 6,
      "ticket_id": 5,
      "action": "APPROVE",
      "from_status": "PENDING_REVIEW",
      "to_status": "CLOSED",
      "note": "现场复核正常，同意归档",
      "operator_role": "auditor",
      "created_at": "2026-09-19T10:30:00Z"
    },
    {
      "id": 7,
      "ticket_id": 6,
      "action": "SUBMIT",
      "from_status": "IN_PROGRESS",
      "to_status": "PENDING_REVIEW",
      "note": "已修复管网漏点并加压测试",
      "operator_role": "vendor",
      "created_at": "2026-09-26T08:30:00Z"
    }
  ]
} as const;
