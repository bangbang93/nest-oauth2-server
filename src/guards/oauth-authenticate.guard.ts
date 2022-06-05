import * as OAuth2Server from 'oauth2-server';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { OAuthGuard } from './oauth.guard';

@Injectable()
export class OAuthAuthenticateGuard extends OAuthGuard {
  protected async execute(context: ExecutionContext, request: OAuth2Server.Request, response: OAuth2Server.Response, options?: OAuth2Server.AuthenticateOptions): Promise<boolean> {
    try {
      const token = await this.oauthServer.authenticate(request, response, options);
      const res = context.switchToHttp().getResponse();
      res.locals.oauth = { token };
      return true;
    } catch (error) {
      this.handleError(context, error, response);
    }
  }
}