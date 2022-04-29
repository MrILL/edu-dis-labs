import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('echo/:param')
  echoGet(
    @Param('param') params,
    @Query() query,
    @Body() body,
    @Req() request,
  ): any {
    return {
      param: params,
      queryString: query,
      body: body,
      cookie: request.cookies,
    };
  }

  @Post('echo/:param')
  echoPost(
    @Param('param') params,
    @Query() query,
    @Body() body,
    @Req() request,
  ): any {
    return {
      param: params,
      queryString: query,
      body: body,
      cookie: request.cookies,
    };
  }
}
