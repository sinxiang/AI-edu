// /components/teaching/resource-library/CaseLibrary.tsx
"use client";

import { Search, Filter, BookOpen, Users, Target, BarChart3, Download, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface CaseStudy {
    id: string;
    title: string;
    description: string;
    industry: string;
    difficulty: "入门" | "中级" | "高级";
    duration: string;
    participants: number;
    learningGoals: string[];
    tools: string[];
    rating: number;
    downloads: number;
    author: string;
    publishedAt: string;
    isFeatured?: boolean;
}

export function CaseLibrary() {
    const cases: CaseStudy[] = [
        {
            id: "1",
            title: "基于CNN的图像分类实战案例",
            description: "使用卷积神经网络对CIFAR-10数据集进行图像分类的完整实战项目",
            industry: "计算机视觉",
            difficulty: "中级",
            duration: "4周",
            participants: 156,
            learningGoals: ["掌握CNN基本原理", "学会数据增强技术", "掌握模型评估方法"],
            tools: ["Python", "TensorFlow", "OpenCV"],
            rating: 4.8,
            downloads: 890,
            author: "张教授",
            publishedAt: "2023-10-20",
            isFeatured: true
        },
        {
            id: "2",
            title: "电商用户行为分析案例",
            description: "基于Spark和Hadoop的电商用户行为数据分析与挖掘",
            industry: "大数据分析",
            difficulty: "高级",
            duration: "6周",
            participants: 89,
            learningGoals: ["掌握大数据处理流程", "学习用户行为分析", "掌握可视化技术"],
            tools: ["Spark", "Hadoop", "Python", "Tableau"],
            rating: 4.9,
            downloads: 456,
            author: "李博士",
            publishedAt: "2023-11-15"
        },
        {
            id: "3",
            title: "自然语言处理情感分析案例",
            description: "使用BERT模型对社交媒体文本进行情感倾向性分析",
            industry: "自然语言处理",
            difficulty: "中级",
            duration: "3周",
            participants: 234,
            learningGoals: ["理解BERT模型", "掌握文本预处理", "学会模型调优"],
            tools: ["Python", "PyTorch", "Hugging Face"],
            rating: 4.7,
            downloads: 678,
            author: "王教授",
            publishedAt: "2023-09-28"
        },
        {
            id: "4",
            title: "时间序列预测案例",
            description: "使用LSTM模型预测股票价格走势的时间序列分析",
            industry: "金融科技",
            difficulty: "高级",
            duration: "5周",
            participants: 112,
            learningGoals: ["掌握LSTM原理", "学会特征工程", "掌握模型评估"],
            tools: ["Python", "TensorFlow", "Pandas"],
            rating: 4.6,
            downloads: 345,
            author: "赵老师",
            publishedAt: "2023-12-05"
        },
    ];

    const difficultyColors = {
        "入门": "bg-emerald-100 text-emerald-600",
        "中级": "bg-amber-100 text-amber-600",
        "高级": "bg-rose-100 text-rose-600"
    };

    return (
        <div className="h-full overflow-y-auto p-6">
            {/* 头部 */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">案例库</h1>
                <p className="text-slate-600">真实项目案例，提升学生实战能力</p>
            </div>

            {/* 特色案例 */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                    <h2 className="text-lg font-semibold text-slate-800">特色推荐案例</h2>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6">
                    {cases.filter(c => c.isFeatured).map(featuredCase => (
                        <div key={featuredCase.id} className="flex flex-col lg:flex-row gap-6">
                            <div className="lg:w-2/3">
                                <div className="flex items-center gap-3 mb-3">
                                    <Badge className="bg-indigo-500 text-white">特色案例</Badge>
                                    <Badge className={difficultyColors[featuredCase.difficulty]}>
                                        {featuredCase.difficulty}
                                    </Badge>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{featuredCase.title}</h3>
                                <p className="text-slate-600 mb-4">{featuredCase.description}</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div className="bg-white p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Target className="h-4 w-4 text-indigo-500" />
                                            <span className="text-sm text-slate-700">难度</span>
                                        </div>
                                        <div className="font-semibold text-slate-800">{featuredCase.difficulty}</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <BookOpen className="h-4 w-4 text-indigo-500" />
                                            <span className="text-sm text-slate-700">时长</span>
                                        </div>
                                        <div className="font-semibold text-slate-800">{featuredCase.duration}</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Users className="h-4 w-4 text-indigo-500" />
                                            <span className="text-sm text-slate-700">参与人数</span>
                                        </div>
                                        <div className="font-semibold text-slate-800">{featuredCase.participants}</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <BarChart3 className="h-4 w-4 text-indigo-500" />
                                            <span className="text-sm text-slate-700">评分</span>
                                        </div>
                                        <div className="font-semibold text-slate-800">{featuredCase.rating}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/3">
                                <div className="bg-white rounded-lg p-5 border border-slate-200">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-slate-800 mb-2">学习目标</h4>
                                        <ul className="space-y-2">
                                            {featuredCase.learningGoals.map((goal, index) => (
                                                <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                                                    {goal}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold text-slate-800 mb-2">使用工具</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {featuredCase.tools.map(tool => (
                                                <Badge key={tool} variant="secondary">
                                                    {tool}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button className="flex-1">
                                            查看详情
                                        </Button>
                                        <Button variant="outline">
                                            <Bookmark className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 搜索和筛选 */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="搜索案例..." className="pl-10" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
                            <option value="">全部行业</option>
                            <option value="计算机视觉">计算机视觉</option>
                            <option value="自然语言处理">自然语言处理</option>
                            <option value="大数据分析">大数据分析</option>
                            <option value="金融科技">金融科技</option>
                        </select>
                        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
                            <option value="">全部难度</option>
                            <option value="入门">入门</option>
                            <option value="中级">中级</option>
                            <option value="高级">高级</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 案例列表 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cases.filter(c => !c.isFeatured).map(caseStudy => (
                    <div key={caseStudy.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="font-semibold text-lg text-slate-800 mb-1">{caseStudy.title}</h3>
                                <p className="text-slate-600 text-sm line-clamp-2">{caseStudy.description}</p>
                            </div>
                        </div>

                        {/* 标签和难度 */}
                        <div className="flex items-center gap-2 mb-4">
                            <Badge className={difficultyColors[caseStudy.difficulty]}>
                                {caseStudy.difficulty}
                            </Badge>
                            <Badge variant="outline">{caseStudy.industry}</Badge>
                        </div>

                        {/* 学习目标 */}
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-slate-700 mb-2">学习目标</h4>
                            <div className="flex flex-wrap gap-2">
                                {caseStudy.learningGoals.slice(0, 2).map((goal, index) => (
                                    <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                                        {goal}
                                    </span>
                                ))}
                                {caseStudy.learningGoals.length > 2 && (
                                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                                        +{caseStudy.learningGoals.length - 2}更多
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* 工具 */}
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-slate-700 mb-2">使用工具</h4>
                            <div className="flex flex-wrap gap-2">
                                {caseStudy.tools.map(tool => (
                                    <Badge key={tool} variant="secondary">
                                        {tool}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* 底部信息 */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-xs">
                                        {caseStudy.author.charAt(0)}
                                    </div>
                                    <span className="text-sm text-slate-700">{caseStudy.author}</span>
                                </div>
                                <span className="text-xs text-slate-500">{caseStudy.publishedAt}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-sm text-slate-600">
                                    <Users className="h-4 w-4" />
                                    <span>{caseStudy.participants}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-slate-600">
                                    <Download className="h-4 w-4" />
                                    <span>{caseStudy.downloads}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        详情
                                    </Button>
                                    <Button size="sm">
                                        使用案例
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 底部操作 */}
            <div className="mt-6 flex justify-center gap-4">
                <Button variant="outline">
                    分享我的案例
                </Button>
                <Button>
                    上传案例
                </Button>
            </div>
        </div>
    );
}