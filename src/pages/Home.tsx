import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Shield, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { openModal } = useStore();

  const services = [
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: '代理记账',
      desc: '专业会计团队为您提供准确、及时的记账服务，规避税务风险。',
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: '税务筹划',
      desc: '合法合规的税务筹划方案，帮助企业最大化享受税收优惠政策。',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: '公司注册',
      desc: '一站式公司注册服务，从核名到领取执照，全程无忧代办。',
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
      title: '审计验资',
      desc: '出具各类审计报告、验资报告，专业严谨，快速高效。',
    },
  ];

  const features = [
    '10年+ 行业经验',
    '1000+ 服务客户',
    '1对1 专属会计',
    '0差错 赔付保障',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Office background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            专业财税服务，<br className="md:hidden" />助力企业腾飞
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto"
          >
            元宝会计师事务所，为您提供一站式企业财税解决方案。让您专注于业务增长，财税后顾无忧。
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={openModal}
              className="px-8 py-4 bg-primary text白 text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              免费获取方案 <ArrowRight size={20} />
            </button>
            <a
              href="#services"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text白 text-white border border白/20 border-white/20 rounded-lg font-bold text-lg hover:bg白/20 transition-colors"
            >
              了解更多服务
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {features.map((feature, index) => (
              <div key={index} className="text-white font-medium text-lg flex items-center justify-center gap-2">
                <CheckCircle2 className="opacity-80" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">核心服务项目</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              我们要做的不仅仅是记账，更是为您提供全方位的企业财税管家服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                alt="Team meeting"
                className="relative z-10 rounded-2xl shadow-xl w-full object-cover h-[400px] lg:h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg z-20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-primary">99%</div>
                  <div className="text-sm text-slate-600">客户满意度<br/>五星好评</div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                为什么选择<span className="text-primary">元宝会计</span>？
              </h2>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                我们拥有一支由注册会计师、税务师组成的专业团队，深耕财税领域多年。我们深知创业者的不易，致力于用最专业的知识，为企业规避风险，创造价值。
              </p>
              
              <div className="space-y-4">
                {[
                  '标准化服务流程，进度实时可查',
                  '严格的信息保密制度，守护企业数据安全',
                  '智能财税系统，告别传统手工账乱账',
                  '7x24小时在线咨询，及时响应您的需求'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={openModal}
                className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                了解更多详情
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">准备好开始您的无忧财税之旅了吗？</h2>
          <p className="text-slate-400 text-lg mb-8">
            立即咨询，获取为您量身定制的财税解决方案。前50名咨询客户可获赠免费财务体检一次。
          </p>
          <button
            onClick={openModal}
            className="px-10 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg shadow-primary/25"
          >
            立即免费咨询
          </button>
        </div>
      </section>
    </div>
  );
};
