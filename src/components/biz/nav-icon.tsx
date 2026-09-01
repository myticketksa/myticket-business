import type { ComponentType } from "react"
import {
  ArchiveIcon,
  BankIcon,
  CalendarBlankIcon,
  ChartLineUpIcon,
  ChatsCircleIcon,
  CircleDashedIcon,
  DoorOpenIcon,
  GearIcon,
  HouseIcon,
  ImagesIcon,
  LifebuoyIcon,
  QrCodeIcon,
  ReceiptIcon,
  StarIcon,
  StorefrontIcon,
  UserCircleIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react"
import type { IconProps } from "@phosphor-icons/react"
import type { NavIconName } from "@/layouts/nav-config"

const icons: Record<NavIconName, ComponentType<IconProps>> = {
  "house-fill": HouseIcon,
  "calendar-blank": CalendarBlankIcon,
  storefront: StorefrontIcon,
  archive: ArchiveIcon,
  "users-three": UsersThreeIcon,
  "circle-dashed": CircleDashedIcon,
  "chats-circle": ChatsCircleIcon,
  "qr-code": QrCodeIcon,
  "door-open": DoorOpenIcon,
  "chart-line-up": ChartLineUpIcon,
  receipt: ReceiptIcon,
  bank: BankIcon,
  star: StarIcon,
  "user-circle": UserCircleIcon,
  images: ImagesIcon,
  gear: GearIcon,
  lifebuoy: LifebuoyIcon,
}

const filled: Partial<Record<NavIconName, IconProps["weight"]>> = {
  "house-fill": "fill",
}

interface NavIconProps {
  name: NavIconName
  className?: string
  active?: boolean
}

export function NavIcon({ name, className, active = false }: NavIconProps) {
  const Icon = icons[name]

  return (
    <Icon
      className={className}
      weight={filled[name] ?? (active ? "fill" : "regular")}
    />
  )
}
