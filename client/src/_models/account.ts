export interface Account {
    id : number, 
    email : string,
    passWord : string,
    phoneNumber : string, 
    fisrtName : string, 
    lastName : string,
    dayOfBirth : Date,
    classCustomer :string,
    role : number, 
    departmentId : number | undefined,
    creationTime : Date 
}