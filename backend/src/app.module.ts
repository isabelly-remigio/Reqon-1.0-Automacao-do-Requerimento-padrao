import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno/aluno.entity';
import { Servidor } from './servidor/servidor.entity';
import { Requerimento } from './requerimento/requerimento.entity';  
import { AlunoModule } from './aluno/aluno.module';
import { ServidorModule } from './servidor/servidor.module';
import { AuthModule } from './auth/auth.module'; 
import { RequerimentoModule } from './requerimento/requerimento.module';
import { MulterModule } from '@nestjs/platform-express';
import { SolicitacaoModule } from './solicitacao/solicitacao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/usuario.entity';
import { RecuperarSenhaModule } from './recuperar-senha/recuperar-senha.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: '',
      entities: [Aluno, Servidor, Requerimento, Usuario],  
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Aluno, Servidor, Requerimento]), 
    MulterModule.register({
      dest: './uploads', 
    }),
    AlunoModule,
    ServidorModule,
    AuthModule,
    RequerimentoModule,
    SolicitacaoModule,
    
    UsuarioModule,
    RecuperarSenhaModule,
    
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}