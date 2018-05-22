export interface Work {
    work_id: number
    reference?: string
    party_id: number
    work_status_id: number
    date_created: Date
    date_modified: Date
}

export interface WorkStatus {
    work_status_id: number
    name: string
    enabled: boolean
}

export interface Party {
    party_id: number
    party_type_id: number
    name: string
}

export interface PartyType {
    party_type_id: number
    name: string
    enabled: boolean
}

export interface PartyRelationship {
    party_id_1: number
    party_id_2: number
    party_relationship_type_id: number
}

export interface PartyRelationshipType {
    party_relationship_type_id: number
    name: string
    enabled: boolean
}
