export interface PartyCreateRequest {
    party_type_id: number
    name: string
}

export interface PartyTypeCreateRequest {
    name: string
    enabled: boolean
}

export interface WorkStatusCreateRequest {
    name: string
    enabled: boolean
}

export interface WorkCreateRequest {
    reference?: string
    party_id: number
    work_status_id: number
    date_created?: Date
    date_modified?: Date
}

export interface PartyRelationshipCreateRequest {
    party_id_1: number
    party_id_2: number
    party_relationship_type_id: number
}

export interface PartyRelationshipTypeCreateRequest {
    name: string
    enabled: boolean
}
