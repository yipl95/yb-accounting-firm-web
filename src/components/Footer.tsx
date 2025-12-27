import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
              <span className="bg-primary text-white p-1 rounded-lg">YB</span>
              元宝会计
            </span>
            <p className="text-slate-400 text-sm leading-relaxed">
              专业的财税服务团队，致力于为中小企业提供高效、合规的财务解决方案。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">服务项目</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">代理记账</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">公司注册</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">税务筹划</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">审计验资</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">公司简介</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">团队风采</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">成功案例</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">加入我们</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">联系方式</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>400-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>contact@yuanbao.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-1" />
                <span>北京市朝阳区CBD核心区88号</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} 元宝会计师事务所. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
