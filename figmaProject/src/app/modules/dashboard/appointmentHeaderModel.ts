// appointment-header.model.ts
export class AppointmentHeader {
  preferred_date_from: string = ''
  preferred_date_to: string = ''
  requested_date_from: string = ''
  requested_date_to: string = ''
  offset: number = 0
  page_size: number = 500
  category: string[] = []
  status: string[] = []
  hsm_id: string[] = []
  visit_type: string[] = []
  selectedCard: string = 'total'

  update(params: {
    currentStatus?: string
    currentCategory?: string[]
    currentVisitType?: string[]
    currentSpeciality?: string[]
  }): void {
    if (params.currentStatus !== undefined) {
      this.selectedCard = params.currentStatus
    }
    if (params.currentCategory !== undefined) {
      this.category = params.currentCategory
    }
    if (params.currentVisitType !== undefined) {
      this.visit_type = params.currentVisitType
    }
    if (params.currentSpeciality !== undefined) {
      this.hsm_id = params.currentSpeciality
    }
  }
}
