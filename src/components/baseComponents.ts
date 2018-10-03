export class BaseComponent {
    public constructor() {}
    protected getQuery(where: any) {
        return {
            where
        };
    }
}
