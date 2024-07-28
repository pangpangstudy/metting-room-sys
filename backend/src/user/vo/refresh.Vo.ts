import { ApiProperty } from '@nestjs/swagger';

export class RefreshVo {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
}
