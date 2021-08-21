import AppModuleInterface from "../../../common/commom_object_config_auto_create/AppModuleInterface";
import ObjectFormInterface from "../../../common/commom_object_config_auto_create/ObjectFormInterface";
import { TypeControl } from "../../../common/commom_object_config_auto_create/TypeControl.js";
import {valueRadioGioiTinh} from "./../../../common/data_options_select/optionSelect"

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
        dataField: "img",
        text: "Avatar",
        description: "Tên Avatar",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Input,
        hidden: false
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
    {
        dataField: "gioiTinh",
        text: "Giới tính",
        description: "Giới tính",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.InputRadio,
        hidden: false,
        dataOption:valueRadioGioiTinh

    },
    {
        dataField: "facebook",
        text: "Facebook",
        description: "Facebook",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Input,
        hidden: false
    },
    {
        dataField: "soDienThoai",
        text: "Số điện thoại",
        description: "Số điện thoại",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Input,
        hidden: false
    },
    {
        dataField: "cmnd",
        text: "CMND",
        description: "CMND",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Input,
        hidden: false
    },
    {
        dataField: "tenDangNhap",
        text: "Tên đăng nhập",
        description: "Tên đăng nhập",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Input,
        hidden: false
    },
    {
        dataField: "matKhau",
        text: "Mật khẩu",
        description: "Mật khẩu",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Input,
        hidden: false
    },
    {
        dataField: "xacNhanMatKhau",
        text: "Xác nhận mật khẩu",
        description: "Xác nhận mật khẩu",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Input,
        hidden: false
    },
    {
        dataField: "quyenId",
        text: "Quyền",
        description: "Quyền",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Select,
        validate: true,
        hidden: false,
        apiSelect:'/quanlyquyen/getAllSelect'
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