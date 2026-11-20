export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'
export type Language = 'C' | 'CPP' | 'JAVA' | 'PYTHON' | 'KOTLIN'
export type Role = 'STUDENT' | 'ADMIN'

export interface User { id:number; name:string; email:string; avatarUrl?:string; role:Role }
export interface AuthResponse { accessToken:string; refreshToken:string; expiresInSeconds:number; user:User }
export interface ProblemSummary { id:number; name:string; slug:string; difficulty:Difficulty; estimatedMinutes:number; companies:string[]; topics:string[]; completed:boolean; revision:boolean; hasVideo:boolean; solutionCount:number }
export interface Concept { id:number; name:string; slug:string; description:string; icon?:string; problemCount:number; completedCount:number; progressPercent:number; problems:ProblemSummary[] }
export interface PlatformLink { id:number; platform:string; url:string }
export interface Video { id:number; title:string; url:string; channelName?:string }
export interface Solution { id:number; language:Language; solutionCode:string; approach:string; explanation?:string; timeComplexity:string; spaceComplexity:string; walkthrough?:string; pseudoCode?:string }
export interface ProblemDetail { id:number; name:string; slug:string; conceptName:string; conceptSlug:string; description:string; difficulty:Difficulty; estimatedMinutes:number; constraints?:string; inputFormat?:string; outputFormat?:string; examples?:string; companies:string[]; topics:string[]; platformLinks:PlatformLink[]; videos:Video[]; solutions:Solution[]; completed:boolean; revision:boolean }
export interface SearchResult { type:'concept'|'problem'; title:string; subtitle:string; path:string; difficulty?:Difficulty }
export interface ContinueLearning { problem:ProblemSummary; conceptName:string; conceptSlug:string; lastViewedAt:string }
export interface ProgressOverview { completed:number; total:number; percentage:number; revisionCount:number; continueLearning?:ContinueLearning; recent:ContinueLearning[] }
export interface Page<T> { content:T[]; totalElements:number; totalPages:number; number:number; size:number }
export interface Dashboard { users:number; concepts:number; problems:number; videos:number; solutions:number; recentActivity:{type:string;label:string;at:string}[] }

