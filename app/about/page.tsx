export default function AboutPage() {
  return (
    <main className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">
              FoodHub အကြောင်း
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              အရသာမြောက် အိမ်ထောင်ပို့စာသင့် အတွေ့အကြုံ
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              FoodHub သည် မြန်မာပြည်တွင် အရည်အသွေးရှိသော အစားအစာများကို အိမ်အထိ လျင်မြန်စွာပို့ဆောင်ပေးသော စနစ်တကျသော စားသောက်ပို့ဆောင်ရေး အက်ပ်တစ်ခုဖြစ်သည်။ ကျွန်ုပ်တို့သည် ဖောက်သည်များ၏ အချိန်နှင့် စိတ်ချရမှုကို ဦးစားပေးပါသည်။
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-[0_35px_120px_-40px_rgba(15,23,42,0.15)] ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
            <p className="text-sm uppercase tracking-[0.35em] text-orange-500 dark:text-orange-300">ကျွန်ုပ်တို့၏ စည်းမျဉ်း</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">အာရုံစိုက်ချက်များ</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li>• အရည်အသွေးမြင့် စားသောက်ကုန်အိမ်တွင်းပို့ဆောင်ခြင်း</li>
              <li>• လုံခြုံစိတ်ချရသော အွန်လိုင်း ပို့ဆောင်မှုစနစ်</li>
              <li>• အချိန်တွင်တိကျသော သတင်းပို့မှုနှင့် ဖောက်သည်ဝန်ဆောင်မှု</li>
            </ul>
          </div>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">မြန်ဆန်မှု</p>
            <h3 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">၃၀ မိနစ်အတွင်း</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">ပြည်နယ်အနှံ့ လျင်မြန်ပြီး ယုံကြည်စိတ်ချရသော ပို့ဆောင်ရေး။</p>
          </div>

          <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">အရမ်းကျယ်</p>
            <h3 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">၁၀၀၀+</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">ဧရိယာများနှင့်စားသောက်ဆိုင်များ အနက်မှ အားကောင်းမှု။</p>
          </div>

          <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500 dark:text-orange-300">ဖောက်သည်ကျေနပ်မှု</p>
            <h3 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">၄.၈/၅</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">ကျွန်ုပ်တို့၏ဖောက်သည်အများစုက အနေအထားကို အရမ်းချီးမွမ်းခဲ့ကြသည်။</p>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_35px_120px_-40px_rgba(15,23,42,0.15)] ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">ကျွန်ုပ်တို့၏ မာတိကာ</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              FoodHub သည် စားသောက်ကုန်လုပ်ငန်းကို အဆင်ပြေစေပြီး မြန်မာပြည်သူများအတွက် စားသောက်နိုင်စွမ်းထက်မြက်စေရန် ရည်ရွယ်သည်။ သင့်အတွက် အရသာထွက်ပေါက်သော ဟင်းလျာများကို ရွေးချယ်ပေးပြီး အိမ်သို့ တိုက်ရိုက်ပို့ဆောင်သည်။
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />
                သန့်ရှင်းသော ကာယနှင့် စိတ်ချရသော အစားအစာအရင်းအမြစ်များ
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />
                ထူးခြားသော ဆိုင်ပိုင်ရှင်များနှင့် ပူးပေါင်းဆောင်ရွက်ခြင်း
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />
                သင့်နေရပ်ဧရိယာအတွက် အမြဲတမ်း လက်တွေ့လက်ခံနိုင်သော ပို့ဆောင်မှု
              </li>
            </ul>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-b from-orange-500 to-orange-600 p-8 text-white shadow-[0_35px_120px_-40px_rgba(251,146,60,0.35)]">
            <h2 className="text-2xl font-semibold">FoodHub စိတ်တိုင်းမကျမည် မဟုတ်ပါ</h2>
            <p className="mt-4 text-sm leading-7 text-orange-100">
              ကျွန်ုပ်တို့သည် စားသောက်ကုန်အား အရည်အသွေးမြင့်မားစွာ ထုတ်လုပ်ပေးရန်နှင့် သင့်အိမ်သို့ အမြန်ဆုံးပို့ဆောင်ပေးရန် ဦးစားပေးပါသည်။
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <div className="rounded-3xl bg-white/10 p-4">
                <p className="font-semibold">၁၀၀% လုံခြုံမှု</p>
                <p className="mt-2 text-orange-100">အော်ဒါလိုင်းအားလုံးကို မှန်ကန်စွာကာကွယ်သည်။</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <p className="font-semibold">ပြန်လည်ငွေရှင်းမေးခွန်းများ</p>
                <p className="mt-2 text-orange-100">အကောင်းဆုံး ဝန်ဆောင်မှုနှင့် ပြန်လည်ပြည့်စုံမှုကို ပြုပြင်ပေးပါသည်။</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
