export interface Hackathon {
    id: number
    title: string
    description: string
    end_date: string
    start_date: string
    location: string
    address: string
    mode: string
    organiser_clerkId: string
    prize_money: number
    registration_deadline: string
    registration_fees: string
    status: string
    max_team_size: number
    category: string
    themes: string[]
    tags: string[]
    rules: string[]
    winners: number[]
    additional_info: Record<string, any>
    created_at: string
    updated_at: string
  }
  
  