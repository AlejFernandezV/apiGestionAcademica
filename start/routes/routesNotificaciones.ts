import Route from '@ioc:Adonis/Core/Route'

Route.get('/notificaciones/listar', 'NotificacionesController.listarNotificacionesUsuario')

Route.post('/notificaciones/crear', 'NotificacionesController.crearNotificacion')

Route.put('/notificaciones/actualizar','NotificacionesController.actualizarNotificacion')

Route.delete('/notificaciones/eliminar', 'NotificacionesController.eliminarNotificacion')
