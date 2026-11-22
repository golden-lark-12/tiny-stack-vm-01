import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
function run(P,N){
const S=new Int32Array(256),M=new Int32Array(256),C=new Int32Array(64),O=[];
let sp=0,cp=0,pc=0,ip=0,st=0,ol=0,a,b;
const need=k=>{if(sp<k)throw 2},push=v=>{if(sp>255)throw 3;S[sp++]=v},bin=f=>{need(2);b=S[--sp];a=S[--sp];S[sp++]=f(a,b)},J=()=>pc+3+(((P[pc+1]|P[pc+2]<<8)<<16)>>16),F=String.fromCharCode;
try{for(;;){
if(st++>=1e6)throw 10;
if(pc<0||pc>=P.length)throw 9;
const op=P[pc];
if(!(op<=7||op>=16&&op<=34||op>=48&&op<=52||op>=64&&op<=65||op>=80&&op<=83))throw 5;
const im=op==1?1:op==2?4:op>=48&&op<52?2:0;
if(pc+im>=P.length)throw 9;
const q=pc+1+im;
switch(op){
case 0:return[0,O];
case 1:{const v=P[pc+1];push(v>127?v-256:v);break}
case 2:push(P[pc+1]|P[pc+2]<<8|P[pc+3]<<16|P[pc+4]<<24);break;
case 3:need(1);sp--;break;
case 4:need(1);push(S[sp-1]);break;
case 5:need(2);a=S[sp-1];S[sp-1]=S[sp-2];S[sp-2]=a;break;
case 6:need(2);push(S[sp-2]);break;
case 7:need(3);a=S[sp-3];b=S[sp-2];S[sp-3]=b;S[sp-2]=S[sp-1];S[sp-1]=a;break;
case 16:bin((a,b)=>a+b);break;
case 17:bin((a,b)=>a-b);break;
case 18:bin((a,b)=>Math.imul(a,b));break;
case 19:bin((a,b)=>{if(!b)throw 4;return a/b|0});break;
case 20:bin((a,b)=>{if(!b)throw 4;return a%b});break;
case 21:bin((a,b)=>{if(!b)throw 4;return(a>>>0)/(b>>>0)});break;
case 22:bin((a,b)=>{if(!b)throw 4;return(a>>>0)%(b>>>0)});break;
case 23:need(1);S[sp-1]=-S[sp-1];break;
case 24:bin((a,b)=>a&b);break;
case 25:bin((a,b)=>a|b);break;
case 26:bin((a,b)=>a^b);break;
case 27:need(1);S[sp-1]=~S[sp-1];break;
case 28:bin((a,b)=>a<<(b&31));break;
case 29:bin((a,b)=>a>>(b&31));break;
case 30:bin((a,b)=>a>>>(b&31));break;
case 32:bin((a,b)=>a==b?1:0);break;
case 33:bin((a,b)=>a<b?1:0);break;
case 34:bin((a,b)=>(a>>>0)<(b>>>0)?1:0);break;
case 48:pc=J();continue;
case 49:need(1);pc=S[--sp]?q:J();continue;
case 50:need(1);pc=S[--sp]?J():q;continue;
case 51:if(cp>63)throw 7;C[cp++]=q;pc=P[pc+1]|P[pc+2]<<8;continue;
case 52:if(!cp)throw 8;pc=C[--cp];continue;
case 64:need(1);a=S[--sp];if(a<0||a>255)throw 6;S[sp++]=M[a];break;
case 65:need(2);b=S[--sp];a=S[--sp];if(b<0||b>255)throw 6;M[b]=a;break;
case 80:need(1);a=S[--sp];{const t=String(a);if(ol+t.length>65536)throw 11;ol+=t.length;O.push(t)}break;
case 81:need(1);a=S[--sp];if(ol>65535)throw 11;ol++;O.push(F(a&255));break;
case 82:push(ip<N.length?N[ip++]:-1);break;
case 83:need(1);return[S[--sp]&255,O];
}
pc=q;
}}catch(x){if(typeof x!='number')throw x;return[x,O]}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of readdirSync(I).sort()){
const[e,o]=run(readFileSync(I+'/'+d+'/program.bin'),readFileSync(I+'/'+d+'/input.bin'));
mkdirSync(O+'/'+d,{recursive:true});
writeFileSync(O+'/'+d+'/stdout.bin',o.join(''),'latin1');
writeFileSync(O+'/'+d+'/exit.txt',e+'\n');
}
