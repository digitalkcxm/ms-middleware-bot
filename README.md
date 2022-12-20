
# MS Middleware Bot

Esse serviço foi criado para intermediar a comunicação do bot com o core, com o objetivo de evitar perca de interação com o watson.



## Documentação da API
O microserviço trabalha com fila rabbitmq.

#### Recebe as mensagens.

```json
  watson:receive
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. O id da instancia do bot. |
| `workspace` | `string` | **Obrigatório**. O id da skill do bot. |
| `context` | `JSON` | **Obrigatório**. A mensagem e informações para compreenção. |
| `message` | `JSON` | **Obrigatório**. As informações da mensagem do ms. | 
| `protocol` | `integer` | **Obrigatório**. ID do protocolo |
| `project_name` | `string` | **Obrigatório**. Necessario para o ms saber para onde encaminhar a mensagem. |

#### Envia as mensagens

```json
  watson:send
```
Essa mensagem é passada para um exchange que é um intermediador das filas, então é necessario informar o routing_key para encaminhar para a fila do cliente correto. O routing key é igual ao project_name do projeto.
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `api_key` | `string` | **Obrigatório**. O id da instancia do bot. |
| `workspace` | `string` | **Obrigatório**. O id da skill do bot. |
| `context` | `JSON` | **Obrigatório**. O retorno dado pelo watson. |
| `message` | `JSON` | **Obrigatório**. As informações da mensagem do ms. | 
| `protocol` | `integer` | **Obrigatório**. ID do protocolo |
| `project_name` | `string` | **Obrigatório**. Necessario para o ms saber para onde encaminhar a mensagem. |




## Organização dos componentes. 

| Pasta   |  Descrição                           |
| :---------- | :---------------------------------- |
| `src` | Pasta raiz do projeto | 
| `src/application` | Pasta com a regra de negocio do cliente. | 
| `src/controllers` | Pasta com as entidades de interface. |
| `src/controllers/config` | Pasta com as entidades de interface de configuração. |
| `src/controllers/consumers` | Pasta com as entidades de interface de consumidores rabbit. |
| `src/domain/` |  Pasta com a regra de negocio da aplicação. |
| `src/domain/post` |  Pasta com a regra de negocio de envio de informações, encaminha para o caso de uso expecifico de envio de informações. |
| `src/domain/session` |  Pasta com a regra de negocio para criar a sessão no fornecedor de bot. |
| `src/infraestucture` |  Pasta com confugurações externas a aplicação. |


