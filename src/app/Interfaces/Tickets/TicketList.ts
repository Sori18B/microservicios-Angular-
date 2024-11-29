export interface TicketList{
  ticketID: number,
  title: string,
  description: string,
  creationDate: Date,
  updateDate: Date,
  statusName: string,
  priorityName: string,
  changeDescription: string,
  client:{
    name: string,
    email: string,
  }
  representative:{
    name: string,
    email: string
  }
}
