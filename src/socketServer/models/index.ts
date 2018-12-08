export interface IActivity {
    userId?: number;
    ownerId?: number;
    activity?: Activity;
    content?: string;
}

enum Activity {
    ADD = 'thêm',
    UPDATE = 'cập nhật',
    DELETE = 'xoá'
}
