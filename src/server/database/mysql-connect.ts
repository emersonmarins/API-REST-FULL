import * as dotenv from 'dotenv';
dotenv.config();
import { createPool, Pool, PoolConnection, ResultSetHeader } from 'mysql2/promise';
import { AnyObject, number } from 'yup';
import { IQueryProps } from '../interfaces';
import moment from 'moment-timezone';


interface IConfig {
  name: string | undefined;
  connector: string | undefined;
  url?: string | undefined;
  host: string | undefined;
  port: number | undefined;
  user: string | undefined;
  password?: string | undefined;
  database: string | undefined;
  table: string | undefined;
  timezone: string;
}


class MySQLConnector {
  config: IConfig;
  pool: Pool;

  constructor(config: IConfig) {
    this.config = config;
    this.pool = createPool({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      timezone: this.config.timezone
    });
  }

  async connect(): Promise<PoolConnection | null> {
    try {
      const connection = await this.pool.getConnection();
      console.log('Connected to MySQL database!');
      return connection;
    } catch (err) {
      console.error('Error connecting to MySQL database:', err);
      return null;
    }
  }
  // Insert
  async insertData(data: any): Promise<number | null> {
    try {
      const connection = await this.pool.getConnection();
      const [result] = await connection.query('INSERT INTO User SET ?', data);
      await connection.release();
      return (result as ResultSetHeader).insertId;
    } catch (err) {
      console.error('Error inserting data into MySQL database:', err);
      return null;
    }
  }
  // Read
  async getUserById(userId: any) {
    try {
      const connection = await this.pool.getConnection();
      const [rows] = await connection.execute('SELECT * FROM User WHERE id = ?', [userId]);
      return rows;
    } catch (err) {
      console.error('Error no user with this ID: ', err);
      return null;
    }
  }

  // Update
  async updateUser(userId: any, newData: AnyObject) {
    const formatted_data =  moment().tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss');
   
    try {
      const connection = await this.pool.getConnection();
      let updateQuery = 'UPDATE User SET ';
      const updateValues = [];
      for (const key in newData) {
        if (Object.prototype.hasOwnProperty.call(newData, key)) {
          updateQuery += `${key} = ?, `;
          updateValues.push(newData[key]);
        }
      }
      updateQuery += 'data_last_activity = ?, ';
      updateQuery = updateQuery.slice(0, -2);
      updateQuery += ' WHERE id = ?';

      updateValues.push(formatted_data);
      updateValues.push(userId);

      await connection.query(updateQuery, updateValues);
    } catch (err) {
      console.error('Error unable to update data: ', err);
      return null;
    }
  }

  // Delete
  async deleteUser(userId: any) {
    try {
      const connection = await this.pool.getConnection();
      await connection.execute('DELETE FROM User WHERE id = ?', [userId]);
    } catch (err) {
      console.error('Error, could not delete the user: ', err);
      return null;
    }
  }

  // Read com paginação e filtro
  async getUsersWithPagination(queryProps: IQueryProps) {
    let { page = 1, limit = 50, filter = '' } = queryProps;
    limit = Number(limit);
    page = Number(page);
    filter = filter.toString();
    const offset = (page - 1) * limit;
    const filterCondition = filter ? 'WHERE name LIKE ?' : '';

    try {
      const connection = await this.pool.getConnection();
      const query = `SELECT * FROM ${this.config.table} ${filterCondition}ORDER BY id LIMIT ? OFFSET ?`;
      const values: Array<number> = [limit, offset];
      const [users] = await connection.query(query, values);
      return users;
    } catch (err) {
      console.error('Error unable to get users : ', err);
      return null;
    }
  }
}

const config: IConfig = {
  name: process.env.DB_NAME,
  connector: process.env.TYPE_CONNECTOR,
  url: process.env.URL,
  host: process.env.HOST,
  port: Number(process.env.PORT_MYSQL),
  user: process.env.USER_MSQL,
  password: process.env.PASSWORD_MSQL,
  database: process.env.DATA_BASE,
  table: process.env.TABLE_USER,
  timezone: 'America/Sao_Paulo'
};

const connector = new MySQLConnector(config);
connector.connect();

export { connector };
