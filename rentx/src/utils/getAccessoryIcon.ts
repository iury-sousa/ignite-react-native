import SpeedSvg from "../assets/speed.svg";
import AccelerationSvg from "../assets/acceleration.svg";
import ForceSvg from "../assets/force.svg";
import GasolineSvg from "../assets/gasoline.svg";
import EnergySvg from "../assets/energy.svg";
import HibridSvg from "../assets/hybrid.svg";
import ExchangeSvg from "../assets/exchange.svg";
import PeopleSvg from "../assets/people.svg";
import CarSvg from "../assets/car.svg";
import React from "react";
import { SvgProps } from "react-native-svg";
import { AccessoryType } from "../dtos/CarDTO";

type Icon = { type: AccessoryType; icon: React.FC<SvgProps> };

const icons: Icon[] = [
  { type: "speed", icon: SpeedSvg },
  { type: "acceleration", icon: AccelerationSvg },
  { type: "turning_diameter", icon: ForceSvg },
  { type: "gasoline_motor", icon: GasolineSvg },
  { type: "electric_motor", icon: EnergySvg },
  { type: "hybrid_motor", icon: HibridSvg },
  { type: "exchange", icon: ExchangeSvg },
  { type: "seats", icon: PeopleSvg },
];

export function getAccessoryIcon(type: AccessoryType) {
  return icons.find((icon) => icon.type === type)?.icon ?? CarSvg;
}
