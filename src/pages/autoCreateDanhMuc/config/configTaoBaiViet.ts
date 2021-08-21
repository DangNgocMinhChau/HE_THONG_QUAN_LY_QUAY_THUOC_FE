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
        apiSelect:'/quanlytag/getAllSelect'
    },
    {
        dataField: "tieuDe",
        text: "Tên ",
        description: "Tên ",
        defaultValue: "",
        isShow: true,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Input,
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
    {
        dataField: "file",
        text: "File ",
        description: "File",
        defaultValue: [],
        isShow: false,
        isFilter: false,
        width: 200,
        sort: true,
        renderField: TypeControl.Select,
        validate: true,
        hidden: false,
        apiSelect:'files/img'
    },
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
    buildModalPage:true
})