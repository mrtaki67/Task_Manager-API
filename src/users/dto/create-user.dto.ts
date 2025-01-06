export class CreateUserDto {
    id:             string
    usuario:        string
    email:          string
    password:       string
    Tasks: []

    createdAt?:     Date
    updatedAt?:     Date
}
