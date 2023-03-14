/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface Empty {
}

export interface MetaPagination {
  total: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  avatar: string;
  gender: number;
  role: number;
  cityId: number;
}

export interface ListUser {
  results: User[];
  meta: MetaPagination | undefined;
}

export interface ListUserRequest {
  filters: string;
  perPage: number;
  page: number;
  sort: string;
}

export interface GetUserRequest {
  id: number;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  avatar: string;
  gender: number;
  role: number;
  cityId: number;
}

export interface UpdateUserRequest {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  avatar: string;
  gender: number;
  role: number;
  cityId: number;
}

export interface DeleteUserRequest {
  id: number;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  listUser(request: ListUserRequest): Observable<ListUser>;

  getUser(request: GetUserRequest): Observable<User>;

  createUser(request: User): Observable<User>;

  updateUser(request: UpdateUserRequest): Observable<User>;

  deleteUser(request: DeleteUserRequest): Observable<Empty>;
}

export interface UserServiceController {
  listUser(request: ListUserRequest): Promise<ListUser> | Observable<ListUser> | ListUser;

  getUser(request: GetUserRequest): Promise<User> | Observable<User> | User;

  createUser(request: User): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserRequest): Promise<User> | Observable<User> | User;

  deleteUser(request: DeleteUserRequest): Promise<Empty> | Observable<Empty> | Empty;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["listUser", "getUser", "createUser", "updateUser", "deleteUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
