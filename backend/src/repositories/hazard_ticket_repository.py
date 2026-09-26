from src.seed import seed

class HazardTicketRepository:
    def find_all(self):
        return seed["hazardTicket"]

    def find_by_id(self, ticket_id):
        for row in seed["hazardTicket"]:
            if row["id"] == ticket_id:
                return row
        return None

    def update(self, ticket):
        # 内存库就地更新；每次提交前 service 已重新读取当前状态
        for index, row in enumerate(seed["hazardTicket"]):
            if row["id"] == ticket["id"]:
                seed["hazardTicket"][index] = ticket
                return ticket
        return None

    def list_flow(self, ticket_id):
        events = [event for event in seed["hazardTicketFlow"] if event["ticket_id"] == ticket_id]
        return sorted(events, key=lambda event: event["created_at"])

    def append_flow(self, event):
        seed["hazardTicketFlow"].append(event)
        return event

    def next_flow_id(self):
        return max([event["id"] for event in seed["hazardTicketFlow"]], default=0) + 1
