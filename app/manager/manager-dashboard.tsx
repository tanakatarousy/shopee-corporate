"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getOrCreateVisitorId } from "../../lib/visitor-id";

type Summary={todayViews:number;weekViews:number;weekVisitors:number;totalViews:number;totalVisitors:number;inquiryCount:number;newInquiryCount:number};
type Visitor={visitorId:string;firstSeenAt:string;lastSeenAt:string;pageViews:number;name?:string|null;company?:string|null;email?:string|null};
type Ranking={path?:string;source?:string;views:number;visitors:number};
type Inquiry={id:string;visitorId:string;name:string;company:string;email:string;marketsJson:string;activeListings:string;monthlyListings:string;monthlyHours:string;challenge:string;pilotReady:number;priceIntent:string;status:string;createdAt:string;updatedAt:string};
type Data={summary:Summary;visitors:Visitor[];paths:Ranking[];sources:Ranking[];inquiries:Inquiry[];excluded:{visitorId:string;createdAt:string}[]};

const num=(value:number)=>Number(value||0).toLocaleString("ja-JP");
const date=(value:string)=>new Intl.DateTimeFormat("ja-JP",{dateStyle:"short",timeStyle:"short",timeZone:"Asia/Tokyo"}).format(new Date(value));
function markets(value:string){try{return (JSON.parse(value) as string[]).join("・")}catch{return value}}

export function ManagerDashboard({displayName}:{displayName:string}){
 const [data,setData]=useState<Data|null>(null),[tab,setTab]=useState<"analytics"|"inquiries">("analytics"),[error,setError]=useState(""),[loading,setLoading]=useState(true),[currentId,setCurrentId]=useState("");
 const load=useCallback(async()=>{setLoading(true);setError("");try{const response=await fetch("/api/manager",{cache:"no-store"}),result=await response.json() as Data&{error?:string};if(!response.ok)throw new Error(result.error||"読み込めませんでした。");setData(result)}catch(e){setError(e instanceof Error?e.message:"読み込めませんでした。")}finally{setLoading(false)}},[]);
 useEffect(()=>{setCurrentId(getOrCreateVisitorId());void load()},[load]);
 async function patch(body:Record<string,unknown>){const response=await fetch("/api/manager",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify(body)}),result=await response.json() as {error?:string};if(!response.ok){setError(result.error||"更新できませんでした。");return}await load()}
 return <main className="manager-shell">
  <header className="manager-header"><div><Link href="/">DOCK</Link><span>ADMIN CONSOLE</span></div><div><span>{displayName}</span><form action="/api/manager/logout" method="post"><button type="submit">ログアウト</button></form></div></header>
  <section className="manager-title"><div><small>MARKETING OPERATIONS</small><h1>コーポレートサイト管理</h1><p>問い合わせと匿名アクセスを確認できます。</p></div><Link href="/">公開サイトを見る</Link></section>
  <nav className="manager-tabs"><button className={tab==="analytics"?"active":""} onClick={()=>setTab("analytics")}>アクセス分析</button><button className={tab==="inquiries"?"active":""} onClick={()=>setTab("inquiries")}>問い合わせ <b>{data?.summary.newInquiryCount||0}</b></button></nav>
  {error&&<p className="manager-error">{error}</p>}{loading&&!data&&<p className="manager-loading">読み込み中…</p>}
  {data&&tab==="analytics"&&<>
   <section className="manager-metrics">{[["今日の閲覧",data.summary.todayViews],["直近7日の閲覧",data.summary.weekViews],["直近7日のユーザー",data.summary.weekVisitors],["累計ユーザー",data.summary.totalVisitors],["累計閲覧",data.summary.totalViews]].map(([label,value])=><article key={String(label)}><small>{label}</small><strong>{num(Number(value))}</strong></article>)}</section>
   <div className="manager-grid"><section className="manager-panel"><h2>よく見られているページ</h2>{data.paths.map((item,index)=><p key={item.path}><b>{index+1}. {item.path}</b><span>{item.visitors}人・{item.views}回</span></p>)}</section><section className="manager-panel"><h2>流入元</h2>{data.sources.map((item,index)=><p key={item.source}><b>{index+1}. {item.source==="direct"?"直接アクセス":item.source}</b><span>{item.visitors}人・{item.views}回</span></p>)}</section></div>
   <section className="manager-panel"><h2>最近の訪問者</h2><div className="manager-table"><div className="head"><span>訪問者</span><span>最終閲覧</span><span>閲覧数</span><span>操作</span></div>{data.visitors.map(v=><div key={v.visitorId}><span><b>{v.name||v.company||`訪問者 ${v.visitorId.slice(0,8).toUpperCase()}`}</b><small>{v.email||v.visitorId}{v.visitorId===currentId?"・この端末":""}</small></span><span>{date(v.lastSeenAt)}</span><span>{v.pageViews}回</span><span><button onClick={()=>void patch({action:"set_excluded",visitorId:v.visitorId,excluded:true})}>集計から除外</button></span></div>)}</div></section>
   {data.excluded.length>0&&<section className="manager-panel"><h2>除外中</h2>{data.excluded.map(v=><p key={v.visitorId}><b>{v.visitorId}</b><button onClick={()=>void patch({action:"set_excluded",visitorId:v.visitorId,excluded:false})}>解除</button></p>)}</section>}
  </>}
  {data&&tab==="inquiries"&&<section className="manager-panel"><h2>保存された問い合わせ</h2><div className="manager-inquiries">{data.inquiries.length===0&&<p>まだ問い合わせはありません。</p>}{data.inquiries.map(item=><article key={item.id}><header><div><small>{date(item.createdAt)}・{markets(item.marketsJson)}</small><h3>{item.company||"会社名未入力"}／{item.name}</h3></div><select value={item.status} onChange={event=>void patch({action:"update_inquiry",id:item.id,status:event.target.value})}><option value="new">未確認</option><option value="contacted">連絡済み</option><option value="closed">完了</option></select></header><p><a href={`mailto:${item.email}`}>{item.email}</a></p><dl><div><dt>商品数</dt><dd>{item.activeListings}</dd></div><div><dt>月間追加</dt><dd>{item.monthlyListings}</dd></div><div><dt>作業時間</dt><dd>{item.monthlyHours}</dd></div><div><dt>料金意向</dt><dd>{item.priceIntent}</dd></div></dl><blockquote>{item.challenge}</blockquote></article>)}</div></section>}
 </main>
}
