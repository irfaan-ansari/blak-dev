import { Application } from "@blak/db"

export type ApplicationWith<T> = Application & {
  application: T
}

export type ApplicationStatus = Application["currentStatus"]
