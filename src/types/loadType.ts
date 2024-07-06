import {
  DriverType,
  Equipment,
  LamperFeeEnum,
  LoadStatus,
  TrailerType,
} from "@prisma/client";

enum driverType {
  SOLO,
  TEAM,
}

enum loadType {
  LIVE,
  PRELOAD,
}
export interface loadDataType {
  tripOriginId: string;
  tripDestinationId: string;
  stopsCount: number;
  stops: string[];
  totalDistance?: number;
  payout: number;
  ratePerMile?: number;
  driverType?: driverType | string;
  loadType?: loadType | string;
  loadWeight?: number;
  pickUpTime: Date;
  deliveryTime: Date;
  expirationDate?: Date;
  status: LoadStatus;
  trailerType?: TrailerType | string;
  notes?: string;
  equipment?: Equipment;
  companyId: string;
  tags?: string[];
  commodity: string[];
  lamperFee: LamperFeeEnum;
  detentionFee: boolean;
  detentionDelay: string;
  detentionDelayPerHour: number;
  avarageRating: number;
}
