import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuards } from "src/auth/guards";

export function Auth(){
    return applyDecorators(
        UseGuards(JwtAuthGuards),
        ApiBearerAuth()
    )
}