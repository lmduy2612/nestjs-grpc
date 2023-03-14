/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty.pb";

export const protobufPackage = "user";

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
  data: User[];
}

export interface ListUserRequest {
}

export interface GetUserRequest {
  id: string;
}

export interface DeleteUserRequest {
  id: string;
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

  deleteUser(request: DeleteUserRequest): void;
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
