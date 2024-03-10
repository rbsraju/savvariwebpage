export interface LoginFormData {
    
    email: string;
    password: string;
    
  }
  export interface signInData{
    name: string,
     email: string,
     phoneNumber: string,
     gender: string,
     password: string,
     confirmPassword: string,
}
export interface RideDetails {
    id: string;
    rideId?: string;
    destination: string;
    current: string;
    date: string;
    time: string;
    account:UserAccount;
    status: number;
  }
  
  export interface UserAccount {
      id: string;
      name: string;
      email: string;
    }
  