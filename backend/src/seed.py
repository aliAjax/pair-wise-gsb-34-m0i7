seed = {
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
      "device_code": "HYD-01-1F-01",
      "device_type": "HYDRANT",
      "floor": "1F",
      "location_desc": "1 号楼 1 层东侧楼梯间",
      "install_date": "2026-06-11T09:00:00Z",
      "status": "IN_PROGRESS",
      "next_maintenance_at": "2026-06-11T09:00:00Z"
    },
    {
      "id": 2,
      "building_id": 2,
      "device_code": "SMK-02-2F-03",
      "device_type": "SMOKE_DETECTOR",
      "floor": "2F",
      "location_desc": "2 号楼 2 层走廊中段",
      "install_date": "2026-06-12T09:00:00Z",
      "status": "SUBMITTED",
      "next_maintenance_at": "2026-06-12T09:00:00Z"
    },
    {
      "id": 3,
      "building_id": 3,
      "device_code": "SPR-03-3F-02",
      "device_type": "SPRINKLER",
      "floor": "3F",
      "location_desc": "3 号楼 3 层末端试水装置",
      "install_date": "2026-06-13T09:00:00Z",
      "status": "PLANNED",
      "next_maintenance_at": "2026-06-13T09:00:00Z"
    },
    {
      "id": 4,
      "building_id": 1,
      "device_code": "EXT-01-3F-02",
      "device_type": "EXTINGUISHER",
      "floor": "3F",
      "location_desc": "1 号楼 3 层配电间门口",
      "install_date": "2026-06-14T09:00:00Z",
      "status": "IN_PROGRESS",
      "next_maintenance_at": "2026-06-14T09:00:00Z"
    },
    {
      "id": 5,
      "building_id": 2,
      "device_code": "EXIT-02-B1-01",
      "device_type": "EXIT_LIGHT",
      "floor": "B1",
      "location_desc": "2 号楼地下一层安全出口",
      "install_date": "2026-06-15T09:00:00Z",
      "status": "REVIEWED",
      "next_maintenance_at": "2026-06-15T09:00:00Z"
    },
    {
      "id": 6,
      "building_id": 3,
      "device_code": "SPR-03-5F-01",
      "device_type": "SPRINKLER",
      "floor": "5F",
      "location_desc": "3 号楼 5 层喷淋末端",
      "install_date": "2026-06-16T09:00:00Z",
      "status": "PLANNED",
      "next_maintenance_at": "2026-06-16T09:00:00Z"
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
      "item_code": "HYDRANT-PRESSURE",
      "result_status": "ABNORMAL",
      "measured_value": "0.18MPa",
      "photo_url": "/mock/photo_url-1.png",
      "note": "栓口静压不足，低于 0.25MPa 标准"
    },
    {
      "id": 2,
      "task_id": 2,
      "device_id": 2,
      "item_code": "SMOKE-ALARM-LINKAGE",
      "result_status": "ABNORMAL",
      "measured_value": "measured value 2",
      "photo_url": "/mock/photo_url-2.png",
      "note": "烟感报警后联动主机无反馈"
    },
    {
      "id": 3,
      "task_id": 3,
      "device_id": 3,
      "item_code": "SPRINKLER-END-WATER",
      "result_status": "ABNORMAL",
      "measured_value": "measured value 3",
      "photo_url": "/mock/photo_url-3.png",
      "note": "末端试水压力表指针抖动明显"
    },
    {
      "id": 4,
      "task_id": 1,
      "device_id": 4,
      "item_code": "EXT-PRESSURE",
      "result_status": "ABNORMAL",
      "measured_value": "measured value 4",
      "photo_url": "/mock/photo_url-4.png",
      "note": "灭火器压力指针处于红区"
    },
    {
      "id": 5,
      "task_id": 2,
      "device_id": 5,
      "item_code": "EXIT-LIGHT-BATTERY",
      "result_status": "ABNORMAL",
      "measured_value": "measured value 5",
      "photo_url": "/mock/photo_url-5.png",
      "note": "安全出口灯应急电源失效"
    },
    {
      "id": 6,
      "task_id": 3,
      "device_id": 6,
      "item_code": "SPRINKLER-LEAK",
      "result_status": "ABNORMAL",
      "measured_value": "measured value 6",
      "photo_url": "/mock/photo_url-6.png",
      "note": "喷淋末端接头轻微渗水"
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
      "rectify_note": "已紧固栓口接口并复压",
      "review_note": "复测压力仍不足，需更换减压阀",
      "submitted_at": "2026-09-19T10:30:00Z",
      "closed_at": ""
    },
    {
      "id": 2,
      "result_id": 2,
      "severity": "CRITICAL",
      "owner_id": 12,
      "deadline": "2026-09-30T18:00:00Z",
      "rectify_status": "PENDING_REVIEW",
      "rectify_note": "已更换联动模块并复测正常",
      "review_note": "",
      "submitted_at": "2026-09-25T10:20:00Z",
      "closed_at": ""
    },
    {
      "id": 3,
      "result_id": 3,
      "severity": "HIGH",
      "owner_id": 11,
      "deadline": "2026-09-25T18:00:00Z",
      "rectify_status": "OPEN",
      "rectify_note": "",
      "review_note": "",
      "submitted_at": "",
      "closed_at": ""
    },
    {
      "id": 4,
      "result_id": 4,
      "severity": "HIGH",
      "owner_id": 13,
      "deadline": "2026-10-05T18:00:00Z",
      "rectify_status": "IN_PROGRESS",
      "rectify_note": "",
      "review_note": "",
      "submitted_at": "",
      "closed_at": ""
    },
    {
      "id": 5,
      "result_id": 5,
      "severity": "MEDIUM",
      "owner_id": 12,
      "deadline": "2026-09-18T18:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "已更换应急电源模块",
      "review_note": "现场复验合格，同意归档",
      "submitted_at": "2026-09-16T09:00:00Z",
      "closed_at": "2026-09-17T15:30:00Z"
    },
    {
      "id": 6,
      "result_id": 6,
      "severity": "LOW",
      "owner_id": 13,
      "deadline": "2026-10-10T18:00:00Z",
      "rectify_status": "OPEN",
      "rectify_note": "",
      "review_note": "",
      "submitted_at": "",
      "closed_at": ""
    }
  ],
  "hazardTicketFlow": [
    {
      "id": 1,
      "ticket_id": 1,
      "action": "CREATE",
      "actor_role": "system",
      "note": "巡检异常自动生成整改单",
      "from_status": "",
      "to_status": "OPEN",
      "created_at": "2026-09-18T09:00:00Z"
    },
    {
      "id": 2,
      "ticket_id": 1,
      "action": "SUBMIT_RECTIFY",
      "actor_role": "vendor",
      "note": "已紧固栓口接口并复压",
      "from_status": "OPEN",
      "to_status": "PENDING_REVIEW",
      "created_at": "2026-09-19T10:30:00Z"
    },
    {
      "id": 3,
      "ticket_id": 1,
      "action": "REVIEW_REJECT",
      "actor_role": "auditor",
      "note": "复测压力仍不足，需更换减压阀",
      "from_status": "PENDING_REVIEW",
      "to_status": "IN_PROGRESS",
      "created_at": "2026-09-19T16:00:00Z"
    },
    {
      "id": 4,
      "ticket_id": 2,
      "action": "CREATE",
      "actor_role": "system",
      "note": "巡检异常自动生成整改单",
      "from_status": "",
      "to_status": "OPEN",
      "created_at": "2026-09-22T09:00:00Z"
    },
    {
      "id": 5,
      "ticket_id": 2,
      "action": "SUBMIT_RECTIFY",
      "actor_role": "vendor",
      "note": "已更换联动模块并复测正常",
      "from_status": "IN_PROGRESS",
      "to_status": "PENDING_REVIEW",
      "created_at": "2026-09-25T10:20:00Z"
    },
    {
      "id": 6,
      "ticket_id": 3,
      "action": "CREATE",
      "actor_role": "system",
      "note": "巡检异常自动生成整改单",
      "from_status": "",
      "to_status": "OPEN",
      "created_at": "2026-09-23T09:00:00Z"
    },
    {
      "id": 7,
      "ticket_id": 4,
      "action": "CREATE",
      "actor_role": "system",
      "note": "巡检异常自动生成整改单",
      "from_status": "",
      "to_status": "OPEN",
      "created_at": "2026-09-24T09:00:00Z"
    },
    {
      "id": 8,
      "ticket_id": 5,
      "action": "CREATE",
      "actor_role": "system",
      "note": "巡检异常自动生成整改单",
      "from_status": "",
      "to_status": "OPEN",
      "created_at": "2026-09-15T09:00:00Z"
    },
    {
      "id": 9,
      "ticket_id": 5,
      "action": "SUBMIT_RECTIFY",
      "actor_role": "vendor",
      "note": "已更换应急电源模块",
      "from_status": "OPEN",
      "to_status": "PENDING_REVIEW",
      "created_at": "2026-09-16T09:00:00Z"
    },
    {
      "id": 10,
      "ticket_id": 5,
      "action": "REVIEW_APPROVE",
      "actor_role": "auditor",
      "note": "现场复验合格，同意归档",
      "from_status": "PENDING_REVIEW",
      "to_status": "CLOSED",
      "created_at": "2026-09-17T15:30:00Z"
    },
    {
      "id": 11,
      "ticket_id": 6,
      "action": "CREATE",
      "actor_role": "system",
      "note": "巡检异常自动生成整改单",
      "from_status": "",
      "to_status": "OPEN",
      "created_at": "2026-09-25T09:00:00Z"
    }
  ]
}
