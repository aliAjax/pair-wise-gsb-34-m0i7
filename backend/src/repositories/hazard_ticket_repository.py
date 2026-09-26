from src.seed import seed


class HazardTicketRepository:
    def __init__(self):
        self._tickets = [dict(row) for row in seed["hazardTicket"]]
        self._flows = [dict(row) for row in seed["hazardTicketFlow"]]

    def find_all(self):
        return [dict(row) for row in self._tickets]

    def find_by_id(self, ticket_id):
        for row in self._tickets:
            if row["id"] == ticket_id:
                return dict(row)
        return None

    def save(self, ticket):
        for index, row in enumerate(self._tickets):
            if row["id"] == ticket["id"]:
                self._tickets[index] = dict(ticket)
                return dict(ticket)
        self._tickets.append(dict(ticket))
        return dict(ticket)

    def find_flows(self, ticket_id):
        rows = [dict(row) for row in self._flows if row["ticket_id"] == ticket_id]
        return sorted(rows, key=lambda row: row["id"], reverse=True)

    def append_flow(self, flow):
        flow = dict(flow)
        flow["id"] = max([row["id"] for row in self._flows], default=0) + 1
        self._flows.append(flow)
        return dict(flow)
