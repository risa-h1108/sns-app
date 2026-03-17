import { supabase } from "../lib/supabase";

export const authRepository = {
  async signup(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      //signup（ユーザー登録）で以下の情報をsupabase内に登録する
      email,
      password,
      options: { data: { name } }, //「email,password以外の情報：ユーザー名（=name）」
    });
    if (error != null) throw new Error(error.message);
    return { ...data.user, userName: data.user.user_metadata.name };
  },
};
