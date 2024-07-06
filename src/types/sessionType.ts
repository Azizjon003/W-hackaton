import { Company, CompanyStatusEnum, StatusEnum } from "@prisma/client";

interface UserTypes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  contactEmail: string;
  profile: any | null; // You may define a more specific type for the profile if needed
  password: string;
  createdAt: Date;
  updatedAt: Date;
  companyStatus: CompanyStatusEnum;
  status: StatusEnum; // Assuming status can only be 'ACTIVE' or 'INACTIVE'
  role: "CARRIER" | "ADMIN" | "BROKER" | string | null; // Define specific role types as needed
  creator: Company;
  company: Company;

  companyId?: string;
}
interface SesionDataType {
  id: string;
  useragent: string;
  userId: string;
  user: UserTypes;
}

export { UserTypes, SesionDataType };
