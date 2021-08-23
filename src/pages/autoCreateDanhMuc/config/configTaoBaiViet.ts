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
        dataField: "tag",
        text: "Tag ",
        description: "Tag ",
        defaultValue: [],
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Select,
        validate: true,
        hidden: false,
        apiSelect:'/quanlytag/getAllSelect',
    },
    {
        dataField: "tieuDe",
        text: "Tiêu đề ",
        description: "Tiêu đề ",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        validate: true,
        renderField: TypeControl.Input,
        hidden: false
    },
    {
        dataField: "imgAvatar",
        text: "Hình đại diện",
        description: "Hình đại đại diện",
        defaultValue: "",
        isShow: false,
        isFilter: false,
        width: 200,
        sort: true,
        validate: true,
        renderField: TypeControl.Input,
        hidden: false
    },
    {
        dataField: "gioiThieu",
        text: "Giới thiệu",
        description: "Giới thiệu",
        defaultValue: "undefined",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.InputTextArea,
        hidden: false
    },
    {
        dataField: "noiDung",
        text: "Nội dung ",
        description: "Nội dung ",
        defaultValue: "undefined",
        isShow: false,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.InputEditor,
        hidden: false
    },
    
    // {
    //     dataField: "file",
    //     text: "File ",
    //     description: "File",
    //     defaultValue: [],
    //     isShow: false,
    //     isFilter: false,
    //     width: 200,
    //     sort: true,
    //     renderField: TypeControl.Select,
    //     validate: false,
    //     hidden: false,
    //     apiSelect:'files/img'
    // },
])


export const configTaoBaiViet = (): AppModuleInterface => ({
    appModuleId: "TAO_BAIVIET",
    linkUrl: "/taobaiviet",
    name: "Bài viết",
    description: "Bài viết",
    defineObjectFormProps: defineObjectFormProps(),
    apiCallServer: "quanlybaiviet",
    routerDynamic: true,
    checkOnSaveBaiViet:"tag,file",
    buildModalPage:false
})