import { supabase } from "../lib/supabase";

export const postRepository = {
  async create(content, userId) {
    const { data, error } = await supabase
      .from("posts") //postsテーブルからget等を実施できるよう記載
      .insert([{ content, user_id: userId }]) //insertで作成(追加)されたデータが定義したdataに入る
      .select("*"); //全ての情報を取得

    if (error != null) throw new Error(error.message);
    return data[0];
  },

  async find(page, limit) {
    //数字やnullなど数字以外のものを1に直す、数字が入っていればその数字が定義されたpageになる
    page = isNaN(page) || page < 1 ? 1 : page;

    //paginationの処理部分
    const start = limit * (page - 1);
    const end = start + limit - 1;

    const { data, error } = await supabase
      .from("posts_view")
      .select("*")
      .range(start, end) //start,endで指定した範囲のデータを取得
      .order("created_at", { ascending: false }); //投稿が作成された時間順

    if (error != null) throw new Error(error.message);

    return data.map((post) => {
      return {
        ...post,
        userId: post.user_id,
        userName: post.user_metadata.name,
      };
    });
  },
};
