import { nextId } from 'jsmodules/lib/system/id';

/**
 * 模块入口标记
 * @param target 实例对象
 * @param name 函数名
 * @param descriptor 函数实例
 */
export function module(target: IAppPlugin, name, descriptor) {
    let method = descriptor.value;
    target.name = `module_${nextId()}`;
    //注意,这里不要用箭头函数,已保持this关键字是原来的对象 ⚠️
    descriptor.value = function (...args) {
        var self = this;
        const exec = async () => {
            let error = await method.apply(self, args);
            if (!error) {
                self.__ready__ = true;
            }
            return error
        }
        return exec();
    }
    //如果模块没有一个叫install的函数,就加一个
    if (name != "install") {
        target.install = async () => {
            return descriptor.value();
        }
    }
    target.__installed__ = true;
}

/**
 * 模块暴露给外部调用的验证函数
 * @param target 实例对象
 * @param name 函数名
 * @param descriptor 函数实例
 */
export function moduleFunc(target: IAppPlugin, name, descriptor) {
    let method = descriptor.value;
    //注意,这里不要用箭头函数,已保持this关键字是原来的对象 ⚠️
    descriptor.value = function (...args) {
        var self = this;
        if (!self.__installed__) {
            throw new Error(`模块${self.name}未安装`);
        }
        if (!self.__ready__) {
            throw new Error(`模块${self.name}不可用`);
        }
        return method.apply(self, args);
    }
}

/**
 * 简陋的模块 😍
 */
export interface IAppPlugin {
    /**
     * 模块友好名称
     */
    name?: string;
    /**
     * 模块是否可用
     */
    __ready__?: boolean;
    /**
     * 模块是否安装
     */
    __installed__?: boolean;

    /**
     * 安装模块
     */
    install?: () => any;
}