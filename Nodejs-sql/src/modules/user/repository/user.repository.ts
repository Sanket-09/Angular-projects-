import { db } from '../../../utility/database'

class userRepositoryClass {
  public getUsers(): any {
    let dbPromise = new Promise((resolve, reject) => {
      try {
        db.any('Select * from public.cars')
          .then((data: any) => {
            resolve(data)
          }) //if db is connected and some error
          .catch((error: any) => {
            reject(error)
          })
      } catch (e) {
        //if db is not connected then error
        reject(e)
      }
    })

    return dbPromise //returns a promise
  }

  getUserById(id: any) {
    let dbPromise = new Promise((resolve, reject) => {
      try {
        let query = `SELECT * from public.cars where id = ${id}`

        db.any(query)
          .then((res: any) => {
            if (res.length === 0) {
              reject({ message: `Car with ID: ${id} does not exist.` })
            } else {
              resolve(res)
            }
          })
          .catch((err: any) => reject(err))
      } catch (e) {
        reject(e)
      }
    })

    return dbPromise
  }

  public addUser(addBody: any): any {
    const { brand, model, year } = addBody

    let dbPromise = new Promise((resolve, reject) => {
      try {
        db.any('INSERT INTO public.cars VALUES($1,$2,$3) RETURNING *', [
          brand,
          model,
          year,
        ])
          .then((data: any) => {
            resolve(data)
          }) //if db is connected and some error
          .catch((error: any) => {
            reject(error)
          })
      } catch (e) {
        //if db is not connected then error
        reject(e)
      }
    })

    return dbPromise //returns a promise
  }

  public deleteUser(idToDelete: any): any {
    let dbPromise = new Promise((resolve, reject) => {
      try {
        db.result(`DELETE FROM public.cars WHERE id = ${idToDelete}`) // Consider using parameterized queries to prevent SQL injection
          .then((result: any) => {
            if (result.rowCount === 0) {
              reject({ message: `Car with ID: ${idToDelete} does not exist.` })
            } else {
              resolve({
                message: `Car with ID: ${idToDelete} has been deleted.`,
              })
            }
          })
          .catch((error: any) => {
            reject(error)
          })
      } catch (e) {
        reject(e)
      }
    })

    return dbPromise
  }
}

export const userRepository = new userRepositoryClass()
