import { db } from "../../../utility/database";

class userRepositoryClass {

    public getUsers(): any {

        let dbPromise = new Promise((resolve, reject) => {

            try {

                db.any('Select * from k_arogia_s.users')
                    .then((data:any) => {
                        resolve(data);
                    })
                    .catch((error:any) => {
                        reject(error);
                    });
            }
            catch (e) {
                reject(e);
            }

        });

        return dbPromise;
    }


    getUserById(id:any) {

        let dbPromise = new Promise((resolve, reject) => {

            try {

                let query = `SELECT * from k_arogia_s.users where id = ${id}`

                db.any(query)
                    .then((res:any) => resolve(res))
                    .catch((err:any) => reject(err))
            }
            catch (e) {
                reject(e);
            }

        });

        return dbPromise;
    }
}

export const userRepository = new userRepositoryClass();
