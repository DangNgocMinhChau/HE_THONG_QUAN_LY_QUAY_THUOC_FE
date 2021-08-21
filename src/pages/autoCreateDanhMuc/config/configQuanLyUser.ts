import AppModuleInterface from "../../../common/commom_object_config_auto_create/AppModuleInterface";
import ObjectFormInterface from "../../../common/commom_object_config_auto_create/ObjectFormInterface";
import { TypeControl } from "../../../common/commom_object_config_auto_create/TypeControl.js";

const defineObjectFormProps = (): ObjectFormInterface[] => ([
    {
        dataField: "id",
        text: "ID",
        description: "ID",
        defaultValue: "undefined",
        isShow: false,
        isFilter: true,
        width: 50,
        sort: true,
        render: true,
        renderField: TypeControl.Input,
        hidden: true
    },
    {
        dataField: "tenNguoiDung",
        text: "Tên người dùng ",
        description: "Tên người dùng",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Input,
        hidden: false
    },
    {
        dataField: "ngaySinh",
        text: "Ngày sinh",
        description: "Ngày sinh",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.InputDatePicker,
        hidden: false
    },
])


export const configQuanLyUser = (): AppModuleInterface => ({
    appModuleId: "QUANLY_USER",
    linkUrl: "/quanlytaikhoan2",
    name: "Quản lý tài khoản",
    description: "Quản lý tài khoản",
    defineObjectFormProps: defineObjectFormProps(),
    apiCallServer: "quanlytaikhoan",
    routerDynamic: true,
    buildModalPage:true
})