import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("chats")
class Chat {
  @PrimaryColumn()
  id: string;

  @Column()
  sender_id: string;

  @Column()
  receiver_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Chat };
