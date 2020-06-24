import { HttpFactory, di } from 'jsmodules';

export default class UserService {
    @di.Inject() identity_api_v1: HttpFactory


    async me() {
        return this.identity_api_v1.url(`/users/me`).addSecurityHeaders().get();
    }

}